"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Languages",
      [
        {
          Language_Name: "English",
          Language_Code: "EN",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Urdu",
          Language_Code: "UR",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Arabic",
          Language_Code: "AR",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Hindi",
          Language_Code: "HI",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "French",
          Language_Code: "FR",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Spanish",
          Language_Code: "ES",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Chinese",
          Language_Code: "ZH",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "German",
          Language_Code: "DE",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Turkish",
          Language_Code: "TR",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Russian",
          Language_Code: "RU",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Persian",
          Language_Code: "FA",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Japanese",
          Language_Code: "JA",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Korean",
          Language_Code: "KO",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Italian",
          Language_Code: "IT",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
        {
          Language_Name: "Bengali",
          Language_Code: "BN",
          Is_Active: true,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Languages", null, {});
  },
};
