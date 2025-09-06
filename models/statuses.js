'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Statuses extends Model {
    static associate(models) {
      // define association here later
    }
  }
  Statuses.init({
    Status_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Status_Code: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Statuses',
    tableName: 'Statuses',
    timestamps: true
  });
  return Statuses;
};
