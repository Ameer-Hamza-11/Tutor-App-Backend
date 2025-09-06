"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.UserRoles, { foreignKey: "Role_Id", as: "userroles" });
    }
  }

  Roles.init(
    {
      Role_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Role_Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Is_Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      Role_Description: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Roles",
      tableName: "Roles",
      timestamps: true, // createdAt & updatedAt automatically add honge
    }
  );

  return Roles;
};
