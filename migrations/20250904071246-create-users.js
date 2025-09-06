"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      User_Id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      User_Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      First_Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Last_Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      Phone_Number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      Password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verificationTokenExpires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
