"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Genders",
      [
        {
          Gender_Code: "M",
          Gender_Description: "Male",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Gender_Code: "F",
          Gender_Description: "Female",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Genders", null, {});
  },
};
