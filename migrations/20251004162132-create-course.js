'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      Course_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Teacher_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'User_Id' }
      },
      Subject_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Subjects', key: 'Subject_Id' }
      },
      Title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      Description: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      Duration: Sequelize.STRING(100),
      Fee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      Level: Sequelize.STRING(50),
      Language: Sequelize.STRING(50),
      Thumbnail: Sequelize.STRING(500),
      Max_Students: Sequelize.INTEGER,
      Mode: Sequelize.STRING(50),
      IsApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      Status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: { model: 'Statuses', key: 'Status_Id' }
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
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};
