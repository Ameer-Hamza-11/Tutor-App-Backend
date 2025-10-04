const admin = require("firebase-admin");
const { Op } = require("sequelize");
const serviceAccount = require("../serviceAccountKey.json");
const { Users, UserSubjects, Subjects } = require("../models");


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


const sendJobNotification = async (job, subjectIds) => {
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
    console.error("🔥 sendJobNotification error:", err);
  }
};


module.exports = { sendJobNotification };
