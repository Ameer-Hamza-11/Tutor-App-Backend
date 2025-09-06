"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Genders extends Model {
    static associate(models) {
      
      Genders.hasMany(models.UserDetails, { foreignKey: "Gender_Id", as: "userdetails" });
    }
  }

  Genders.init(
    {
      Gender_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Gender_Code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Gender_Description: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Genders",
      tableName: "Genders",
      timestamps: true, // createdAt & updatedAt
    }
  );

  return Genders;
};
