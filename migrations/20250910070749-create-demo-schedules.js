'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DemoSchedules', {
      Demo_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Request_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'JobRequests',
          key: 'Request_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Scheduled_DateTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
          key: 'Status_Id'
        },
        defaultValue: 13,
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
    await queryInterface.dropTable('DemoSchedules');
  }
};
