'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subjects extends Model {
    static associate(models) {
      Subjects.hasMany(models.UserSubjects, { foreignKey: "Subject_Id", as: "usersubjects" })
    }
  }

  Subjects.init({
    Subject_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Subject_Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Is_Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Subjects',
    tableName: 'Subjects',
    timestamps: true
  });

  return Subjects;
};
