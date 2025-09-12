"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cities", [
      // Pakistan
      { City_Name: "Karachi",  Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Lahore",  Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Islamabad",  Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Peshawar",  Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // India
      { City_Name: "Mumbai", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "New Delhi", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Bangalore", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Chennai", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // USA
      { City_Name: "New York", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Los Angeles", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Chicago", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Houston", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // UK
      { City_Name: "London", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Manchester", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Birmingham", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // Canada
      { City_Name: "Toronto", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Vancouver", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Montreal", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // Australia
      { City_Name: "Sydney", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Melbourne", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // Germany
      { City_Name: "Berlin", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Munich", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // UAE
      { City_Name: "Dubai", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Abu Dhabi", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // Saudi Arabia
      { City_Name: "Riyadh", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Jeddah", Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // China
      { City_Name: "Beijing",  Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Shanghai",  Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Shenzhen",  Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
