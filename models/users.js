"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.UserRoles, { foreignKey: "User_Id", as: "userroles" });
      Users.hasMany(models.UserDetails, { foreignKey: 'User_Id', as: 'userdetails' })
      Users.hasMany(models.EducationDetails, { foreignKey: 'User_Id', as: 'educationdetails' })
      Users.hasMany(models.UserSubjects, { foreignKey: 'User_Id', as: 'usersubjects' })
      Users.hasMany(models.User_Languages, { foreignKey: 'User_Id', as: 'user_languages' })
      Users.hasMany(models.Jobs, { foreignKey: 'Student_Id', as: 'jobs' })
      Users.hasMany(models.JobRequests, { foreignKey: 'Tutor_Id', as: 'jobrequests' })
      Users.hasMany(models.TutorAssignments, { foreignKey: 'Tutor_Id', as: 'tutorAssignmentsAsTutor' })
      Users.hasMany(models.TutorAssignments, { foreignKey: 'Student_Id', as: 'tutorAssignmentsAsStudent' })
    }
  }

  Users.init(
    {
      User_Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      User_Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      First_Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Last_Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      Phone_Number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      Password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: DataTypes.STRING,
      },
      verificationTokenExpires: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "Users",
      timestamps: true, // Sequelize will auto-manage createdAt & updatedAt
    }
  );

  return Users;
};
