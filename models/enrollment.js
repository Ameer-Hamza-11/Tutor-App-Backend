"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CourseEnrollment extends Model {
    static associate(models) {
  
      CourseEnrollment.belongsTo(models.Course, { foreignKey: "Course_Id", as: "course" });
      CourseEnrollment.belongsTo(models.Users, { foreignKey: "Student_Id", as: "student" });
    }
  }

  CourseEnrollment.init(
    {
      Enrollment_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Course_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Student_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Enrolled_Date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      CompletionPercent: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
      },
      LastAccessDate: {
        type: DataTypes.DATE,
      },
      Status: {
        type: DataTypes.INTEGER,
        defaultValue: 1, 
      },
      IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "CourseEnrollment",
      tableName: "CourseEnrollments",
      timestamps: true,
    }
  );

  return CourseEnrollment;
};
