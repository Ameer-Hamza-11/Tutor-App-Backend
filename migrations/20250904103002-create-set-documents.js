'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Set_Documents', {
      Document_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Document_Name: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      Document_Path: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      Source_Id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Source_Name: {
        type: Sequelize.STRING(150),
        allowNull: true
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
    await queryInterface.dropTable('Set_Documents');
  }
};
