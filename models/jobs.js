"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    static associate(models) {
      Jobs.belongsTo(models.Users, {
        foreignKey: "Student_Id",
        as: "student",
      });

      Jobs.belongsTo(models.Subjects, {
        foreignKey: "Subject_Id",
        as: "subject",
      });

      Jobs.belongsTo(models.Statuses, {
        foreignKey: "Status",
        as: "status",
      });
      Jobs.hasMany(models.JobRequests, {
        foreignKey: "Job_Id",
        as: "jobrequests",
      });

      Jobs.hasMany(models.TutorAssignments, {
        foreignKey: "Job_Id",
        as: "tutorassignments",
      });
    }
  }

  Jobs.init(
    {
      Job_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Student_Id: {
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
        type: DataTypes.STRING(500),
      },
      Duration: {
        type: DataTypes.STRING(100),
      },
      Fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Frequency: {
        type: DataTypes.STRING(100),
      },
      Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
    },
    {
      sequelize,
      modelName: "Jobs",
      tableName: "Jobs",
      timestamps: true,
    }
  );

  return Jobs;
};
