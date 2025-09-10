'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TutorAssignments extends Model {
    static associate(models) {
      // Job relation
      TutorAssignments.belongsTo(models.Jobs, {
        foreignKey: 'Job_Id',
        as: 'job',
      });

      // Tutor relation
      TutorAssignments.belongsTo(models.Users, {
        foreignKey: 'Tutor_Id',
        as: 'tutor',
      });

      // Student relation
      TutorAssignments.belongsTo(models.Users, {
        foreignKey: 'Student_Id',
        as: 'student',
      });

      // Status relation
      TutorAssignments.belongsTo(models.Statuses, {
        foreignKey: 'Status',
        as: 'assignmentStatus',
      });
    }
  }

  TutorAssignments.init(
    {
      Assignment_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Job_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Jobs',
          key: 'Job_Id',
        },
      },
      Tutor_Id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      Student_Id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      Start_Date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      End_Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'TutorAssignments',
      tableName: 'TutorAssignments',
      timestamps: true,
    }
  );

  return TutorAssignments;
};
