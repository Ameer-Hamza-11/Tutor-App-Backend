"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Statuses", [
      { Status_Id: 1, Description: "Active", Status_Code: "ACTIVE", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 2, Description: "Inactive", Status_Code: "INACTIVE", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 3, Description: "Pending", Status_Code: "PENDING", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 4, Description: "Blocked", Status_Code: "BLOCKED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 5, Description: "Open", Status_Code: "OPEN", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 6, Description: "Assigned", Status_Code: "ASSIGNED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 7, Description: "Closed", Status_Code: "CLOSED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 8, Description: "ApprovedByAdmin", Status_Code: "APPROVED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 9, Description: "Rejected", Status_Code: "REJECTED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 10, Description: "DemoScheduled", Status_Code: "DEMO_SCHEDULED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 11, Description: "DemoPassed", Status_Code: "DEMO_PASSED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 12, Description: "DemoFailed", Status_Code: "DEMO_FAILED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 13, Description: "Scheduled", Status_Code: "SCHEDULED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 14, Description: "Completed", Status_Code: "COMPLETED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 15, Description: "Cancelled", Status_Code: "CANCELLED", CreatedAt: new Date(), UpdatedAt: new Date() },
      { Status_Id: 16, Description: "Terminated", Status_Code: "TERMINATED", CreatedAt: new Date(), UpdatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Statuses", null, {});
  },
};
