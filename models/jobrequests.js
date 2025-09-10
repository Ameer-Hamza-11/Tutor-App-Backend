'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JobRequests extends Model {
    static associate(models) {
      // JobRequest belongs to Job
      JobRequests.belongsTo(models.Jobs, {
        foreignKey: 'Job_Id',
        as: 'job'
      });

      // JobRequest belongs to Tutor (User)
      JobRequests.belongsTo(models.Users, {
        foreignKey: 'Tutor_Id',
        as: 'tutor'
      });

      // JobRequest has status
      JobRequests.belongsTo(models.Statuses, {
        foreignKey: 'Status',
        as: 'status'
      });

      JobRequests.hasMany(models.DemoSchedules, {
        foreignKey: 'Request_Id',
        as: 'demoschedules'
      })
    }
  }

  JobRequests.init(
    {
      Request_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Job_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Tutor_Id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      Request_Date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
      }
    },
    {
      sequelize,
      modelName: 'JobRequests',
      tableName: 'JobRequests',
      timestamps: true
    }
  );

  return JobRequests;
};
