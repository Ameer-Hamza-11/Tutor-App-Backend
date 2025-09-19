"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE VIEW demo_schedules_view AS
      SELECT 
        d.Demo_Id,
        d.Scheduled_DateTime,
        d.Status AS DemoStatus,
        s.Description AS DemoStatusDescription,
        
        jr.Request_Id,
        jr.Request_Date,
        jr.Status AS JobRequestStatus,
        
        t.User_Id AS Tutor_Id,
        t.User_Name AS TutorUserName,
        t.First_Name AS TutorFirstName,
        t.Last_Name AS TutorLastName,
        t.Email AS TutorEmail,
        
        j.Job_Id,
        j.Title AS JobTitle,
        j.Description AS JobDescription,
        j.Fee AS JobFee
      FROM DemoSchedules d
      JOIN JobRequests jr ON d.Request_Id = jr.Request_Id
      JOIN Users t ON jr.Tutor_Id = t.User_Id
      JOIN Jobs j ON jr.Job_Id = j.Job_Id
      JOIN Statuses s ON d.Status = s.Status_Id;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS demo_schedules_view;
    `);
  }
};
