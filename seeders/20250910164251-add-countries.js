"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Countries", [
      { Country_Id: 1, Country_Name: "Pakistan", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 2, Country_Name: "India", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 3, Country_Name: "United States", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 4, Country_Name: "United Kingdom", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 5, Country_Name: "Canada", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 6, Country_Name: "Australia", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 7, Country_Name: "Germany", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 8, Country_Name: "UAE", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 9, Country_Name: "Saudi Arabia", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { Country_Id: 10, Country_Name: "China", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Countries", null, {});
  },
};
