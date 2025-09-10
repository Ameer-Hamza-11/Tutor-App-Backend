'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TutorAssignments', {
      Assignment_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Job_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Jobs',
          key: 'Job_Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Tutor_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'User_Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Student_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'User_Id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Start_Date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      End_Date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      Status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
          key: 'Status_Id',
        },
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('TutorAssignments');
  },
};
