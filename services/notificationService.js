const admin = require("firebase-admin");
const { Op } = require("sequelize");
const serviceAccount = require("../serviceAccountKey.json");
const { Users, UserSubjects, Subjects, UserRoles, Roles } = require("../models");


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


const sendJobNotificationToTeacher = async (job, subjectIds) => {
  try {
    let ids = [];
    if (Array.isArray(subjectIds)) {
      ids = subjectIds;
    } else if (typeof subjectIds === "string") {
      ids = subjectIds.split(",").map(id => id.trim());
    } else if (job.Subject_Id) {
      ids = [job.Subject_Id];
    }

    if (!ids.length) {
      console.log("❌ No subject IDs found for job");
      return;
    }

    const teachers = await Users.findAll({
      include: [
        {
          model: UserSubjects,
          as: "usersubjects",
          where: { Subject_Id: { [Op.in]: ids } }
        }
      ],
      attributes: ["User_Id", "FCM_Token"]
    });

    console.log("✅ Teachers found:", teachers.length);

    const tokens = teachers
      .map(t => t.FCM_Token)
      .filter(token => !!token);

    console.log("🎯 Extracted tokens:", tokens);
    if (!tokens.length) {
      console.log("❌ No tokens found for teachers");
      return;
    }



    console.log("📨 Sending to tokens:", tokens);
    // Subject names nikal lo
    const subjectRecords = await Subjects.findAll({
      where: { Subject_Id: { [Op.in]: ids } },
      attributes: ["Subject_Name"]
    });

    const subjectNames = subjectRecords.map(s => s.Subject_Name);

    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: "New Job Posted!",
        body: `A new job has been posted for subjects: ${subjectNames.join(", ")}`
      }
    });

    response.responses.forEach(async (res, idx) => {
      if (!res.success) {
        const errorCode = res.error?.errorInfo?.code;
        if (errorCode === "messaging/registration-token-not-registered") {
          const badToken = tokens[idx];
          console.log("🗑 Removing invalid token:", badToken);


          await Users.update(
            { FCM_Token: null },
            { where: { FCM_Token: badToken } }
          );
        }
      }
    });

    console.log(`📨 Notifications sent: ${response.successCount}`);
    console.log(`❌ Failed count: ${response.failureCount}`);
    console.log("📋 Responses:", response.responses.map(r => r.error || "OK"));

  } catch (err) {
    console.error("🔥 sendJobNotificationToTeacher error:", err);
  }
};

const sendCourseNotificationToStudents = async (course, subjectId) => {
  try {
    // ✅ Only send if approved and not deleted
    if (!course.IsApproved || course.IsDeleted) {
      console.log("🚫 Course is not approved or deleted — no notification sent");
      return;
    }

    const students = await Users.findAll({
      include: [
        {
          model: UserRoles,
          as: "userroles",
          include: [
            {
              model: Roles,
              as: "role",
              where: { Role_Name: "Student" },
            },
          ],
        },
      ],
      attributes: ["User_Id", "FCM_Token"],
    });

    console.log("🎓 Students found:", students.length);

    const tokens = students.map((s) => s.FCM_Token).filter(Boolean);
    if (!tokens.length) return console.log("❌ No FCM tokens found for students");

    const subject = await Subjects.findByPk(subjectId);

    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: "New Course Available! 🎉",
        body: `A new ${subject.Subject_Name} course is now available. Check it out!`,
      },
    });

    response.responses.forEach(async (res, idx) => {
      if (!res.success) {
        const errorCode = res.error?.errorInfo?.code;
        if (errorCode === "messaging/registration-token-not-registered") {
          await Users.update({ FCM_Token: null }, { where: { FCM_Token: tokens[idx] } });
        }
      }
    });

    console.log(`✅ Notifications sent: ${response.successCount}`);
    console.log(`❌ Failed: ${response.failureCount}`);
  } catch (err) {
    console.error("🔥 sendCourseNotificationToStudents error:", err);
  }
};


module.exports = { sendJobNotificationToTeacher, sendCourseNotificationToStudents };
