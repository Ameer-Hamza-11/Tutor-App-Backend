"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    static associate(models) {

      Cities.hasMany(models.Address, { foreignKey: 'City_Id', as: 'addresses' })
    }
  }

  Cities.init(
    {
      City_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      City_Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Is_Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Cities",
      tableName: "Cities",
      timestamps: true, // createdAt & updatedAt included
    }
  );

  return Cities;
};
