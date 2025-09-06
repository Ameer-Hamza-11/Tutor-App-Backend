'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Languages', {
      User_Language_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      Language_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Languages',
          key: 'Language_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Proficiency_Level: {
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: '1=Basic, 2=Intermediate, 3=Advanced, 4=Fluent'
      },
      Score: {
        type: Sequelize.DECIMAL(5,2),
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
    await queryInterface.dropTable('User_Languages');
  }
};
