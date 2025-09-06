'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserDetails', {
      User_Detail_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      User_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // parent table
          key: 'User_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Date_Of_Birth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Gender_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Genders',
          key: 'Gender_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      Address_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Addresses',
          key: 'Address_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      Additional_Info: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      Profile_Picture: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      Description: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      Is_Active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable('UserDetails');
  }
};
