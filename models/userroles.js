"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      // Associations
      UserRoles.belongsTo(models.Users, {
        foreignKey: "User_Id",
        as: "user",
      });

      UserRoles.belongsTo(models.Roles, {
        foreignKey: "Role_Id",
        as: "role",
      });
    }
  }

  UserRoles.init(
    {
      User_Role_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      User_Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      Role_Id: {
        type: DataTypes.INTEGER,
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
      modelName: "UserRoles",
      tableName: "UserRoles",
      timestamps: true, // createdAt & updatedAt
    }
  );

  return UserRoles;
};
