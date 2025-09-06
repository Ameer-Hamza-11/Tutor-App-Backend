'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EducationDetails', {
      Education_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      User_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'User_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Degree: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      Institution: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      Year_Of_Completion: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Start_Year: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      End_Year: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Grade: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EducationDetails');
  }
};
