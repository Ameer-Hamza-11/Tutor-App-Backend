'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Set_Documents extends Model {
    static associate(models) {
      Set_Documents.hasOne(models.EducationDetails, {
        foreignKey: 'Document_Id',
        as: 'educationdetails'
      });
    }
  }
  Set_Documents.init({
    Document_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Document_Name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Document_Path: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Source_Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Source_Name: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Set_Documents',
    tableName: 'Set_Documents',
    timestamps: true
  });
  return Set_Documents;
};
