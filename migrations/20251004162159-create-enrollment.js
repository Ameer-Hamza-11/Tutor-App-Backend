'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CourseEnrollments', {
      Enrollment_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Course_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Courses', key: 'Course_Id' }
      },
      Student_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'User_Id' }
      },
      Enrolled_Date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      CompletionPercent: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0
      },
      LastAccessDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: { model: 'Statuses', key: 'Status_Id' }
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CourseEnrollments');
  }
};
