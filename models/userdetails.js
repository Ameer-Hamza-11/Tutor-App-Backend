'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDetails extends Model {
    static associate(models) {
      // User association
      UserDetails.belongsTo(models.Users, {
        foreignKey: 'User_Id',
        as: 'user'
      });

      // Gender association
      UserDetails.belongsTo(models.Genders, {
        foreignKey: 'Gender_Id',
        as: 'gender'
      });

      // Address association
      UserDetails.belongsTo(models.Address, {
        foreignKey: 'Address_Id',
        as: 'address'
      });
    }
  }

  UserDetails.init({
    User_Detail_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Date_Of_Birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Gender_Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Address_Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Additional_Info: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Profile_Picture: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Is_Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'UserDetails',
    tableName: 'UserDetails',
    timestamps: true
  });

  return UserDetails;
};
