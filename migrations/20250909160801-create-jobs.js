"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jobs", {
      Job_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Student_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users", // table name
          key: "User_Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Subject_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Subjects",
          key: "Subject_Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      Duration: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      Fee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      Frequency: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      Status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Statuses",
          key: "Status_Id",
        },
        defaultValue: 5,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Jobs");
  },
};
