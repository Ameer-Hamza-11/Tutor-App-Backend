'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    static associate(models) {
      Countries.hasMany(models.Address, { foreignKey: 'Country_Id', as: 'addresses' })
    }
  }
  Countries.init({
    Country_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Country_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Is_Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Countries',
    tableName: 'Countries',
    timestamps: true,
  });
  return Countries;
};
