'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobRequests', {
      Request_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Job_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Jobs',
          key: 'Job_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Tutor_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'User_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Request_Date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      Status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
          key: 'Status_Id'
        },
        defaultValue: 3,
        onUpdate: 'CASCADE',
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobRequests');
  }
};
