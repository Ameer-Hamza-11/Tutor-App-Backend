"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          Role_Name: "Admin",
          Is_Active: true,
          Role_Description: "Full access to the system",
          Status: "Active",
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Role_Name: "Teacher",
          Is_Active: true,
          Role_Description: "Can manage students and courses",
          Status: "Active",
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Role_Name: "Student",
          Is_Active: true,
          Role_Description: "Can enroll in courses",
          Status: "Active",
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
