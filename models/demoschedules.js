'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DemoSchedules extends Model {
    static associate(models) {
      // Demo belongs to a JobRequest
      DemoSchedules.belongsTo(models.JobRequests, {
        foreignKey: 'Request_Id',
        as: 'jobrequest'
      });

      // Demo has a status
      DemoSchedules.belongsTo(models.Statuses, {
        foreignKey: 'Status',
        as: 'status'
      });
    }
  }

  DemoSchedules.init(
    {
      Demo_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Request_Id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Scheduled_DateTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 13
      }
    },
    {
      sequelize,
      modelName: 'DemoSchedules',
      tableName: 'DemoSchedules',
      timestamps: true
    }
  );

  return DemoSchedules;
};
