"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Subjects, { foreignKey: "Subject_Id", as: "subject" });
      Course.belongsTo(models.Users, { foreignKey: "Teacher_Id", as: "teacher" });
      Course.hasMany(models.CourseEnrollment, { foreignKey: "Course_Id", as: "enrollments" });
    }
  }

  Course.init(
    {
      Course_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Teacher_Id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      Subject_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING(1000),
      },
      Duration: {
        type: DataTypes.STRING(100),
      },
      Fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Level: {
        type: DataTypes.STRING(50),
      },
      Language: {
        type: DataTypes.STRING(50),
      },
      Thumbnail: {
        type: DataTypes.STRING(500),
      },
      Max_Students: {
        type: DataTypes.INTEGER,
      },
      Mode: {
        type: DataTypes.STRING(50), 
      },
      IsApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "Course",
      tableName: "Courses",
      timestamps: true,
    }
  );

  return Course;
};
