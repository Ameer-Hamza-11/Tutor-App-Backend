"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cities", [
      // Pakistan (Country_Id: 1)
      { City_Name: "Karachi", Country_Id: 1, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Lahore", Country_Id: 1, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Islamabad", Country_Id: 1, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Peshawar", Country_Id: 1, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // India (Country_Id: 2)
      { City_Name: "Mumbai", Country_Id: 2, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "New Delhi", Country_Id: 2, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Bangalore", Country_Id: 2, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Chennai", Country_Id: 2, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // USA (Country_Id: 3)
      { City_Name: "New York", Country_Id: 3, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Los Angeles", Country_Id: 3, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Chicago", Country_Id: 3, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Houston", Country_Id: 3, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // UK (Country_Id: 4)
      { City_Name: "London", Country_Id: 4, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Manchester", Country_Id: 4, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Birmingham", Country_Id: 4, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // Canada (Country_Id: 5)
      { City_Name: "Toronto", Country_Id: 5, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Vancouver", Country_Id: 5, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Montreal", Country_Id: 5, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // Australia (Country_Id: 6)
      { City_Name: "Sydney", Country_Id: 6, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Melbourne", Country_Id: 6, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // Germany (Country_Id: 7)
      { City_Name: "Berlin", Country_Id: 7, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Munich", Country_Id: 7, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // UAE (Country_Id: 8)
      { City_Name: "Dubai", Country_Id: 8, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Abu Dhabi", Country_Id: 8, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // Saudi Arabia (Country_Id: 9)
      { City_Name: "Riyadh", Country_Id: 9, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Jeddah", Country_Id: 9, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },

      // China (Country_Id: 10)
      { City_Name: "Beijing", Country_Id: 10, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Shanghai", Country_Id: 10, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
      { City_Name: "Shenzhen", Country_Id: 10, Is_Active: true, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
