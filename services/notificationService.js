const admin = require("firebase-admin");
const { Users, UserRoles, Roles, UserSubjects } = require("../models");
const { Op } = require("sequelize");
const serviceAccount = require("../serviceAccountKey.json");


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const sendJobNotification = async (job, subject) => {
  try {
    // 1) Teachers who explicitly selected the job's subject
    const subjectTeachers = await Users.findAll({
      include: [
        {
          model: UserRoles,
          as: "userroles",
          include: [
            {
              model: Roles,
              as: "role",
              required: true,
              where: { Role_Name: "Teacher" },
            },
          ],
        },
        {
          model: UserSubjects,
          as: "usersubjects",
          required: true,
          where: { Subject_Id: job.Subject_Id },
        },
      ],
      where: {
        FCM_Token: { [Op.ne]: null },
        User_Id: { [Op.ne]: job.Student_Id },
      },
    });

    // 2) Teachers who didn't select any specific subject (treat as "All Subjects")
    const usersHavingAnySubject = await UserSubjects.findAll({
      attributes: ["User_Id"],
      group: ["User_Id"],
      raw: true,
    });
    const userIdsWithSubjects = new Set(usersHavingAnySubject.map((u) => u.User_Id));

    const allSubjectTeachers = await Users.findAll({
      include: [
        {
          model: UserRoles,
          as: "userroles",
          include: [
            {
              model: Roles,
              as: "role",
              required: true,
              where: { Role_Name: "Teacher" },
            },
          ],
        },
        {
          model: UserSubjects,
          as: "usersubjects",
          required: false,
        },
      ],
      where: {
        FCM_Token: { [Op.ne]: null },
        User_Id: {
          [Op.ne]: job.Student_Id,
        },
      },
    });

    const allSubjectTeachersFiltered = allSubjectTeachers.filter(
      (t) => !userIdsWithSubjects.has(t.User_Id)
    );

    // 3) Merge and dedupe, and exclude student's device token if present
    const recipientsById = new Map();
    for (const t of [...subjectTeachers, ...allSubjectTeachersFiltered]) {
      if (t.FCM_Token) {
        recipientsById.set(t.User_Id, t.FCM_Token);
      }
    }

    // fetch student token to avoid sending to same device, even if roles overlap
    let studentToken = null;
    try {
      const student = await Users.findByPk(job.Student_Id);
      studentToken = student?.FCM_Token || null;
    } catch (_) {}

    const tokens = Array.from(recipientsById.values())
      .filter(Boolean)
      .filter((tkn) => (studentToken ? tkn !== studentToken : true));

    if (tokens.length === 0) {
      console.log("⚠️ No teacher tokens available for this job notification.");
      return;
    }

    const message = {
      tokens,
      notification: {
        title: "New Job Posted",
        body: `A new ${subject.Subject_Name} job has been posted.`,
      },
      data: {
        jobId: job.Job_Id.toString(),
        subject: subject.Subject_Name,
        type: "job_post",
        studentId: job.Student_Id.toString(),
      },
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("✅ Notifications sent:", response.successCount);
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};

module.exports = { sendJobNotification };
