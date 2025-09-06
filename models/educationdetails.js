'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EducationDetails extends Model {
    static associate(models) {
      // EducationDetails belongs to User
      EducationDetails.belongsTo(models.Users, {
        foreignKey: 'User_Id',
        as: 'user'
      });

      EducationDetails.belongsTo(models.Set_Documents, {
        foreignKey: 'Document_Id',
        as: 'document'
      });
    }
  };

  EducationDetails.init({
    Education_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Degree: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Institution: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Year_Of_Completion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Start_Year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    End_Year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Grade: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'EducationDetails',
    tableName: 'EducationDetails',
    timestamps: true
  });

  return EducationDetails;
};
