'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      // City association
      Address.belongsTo(models.Cities, {
        foreignKey: 'City_Id',
        as: 'city'
      });

      // Country association
      Address.belongsTo(models.Countries, {
        foreignKey: 'Country_Id',
        as: 'country'
      });

      Address.hasMany(models.UserDetails, { foreignKey: 'Address_Id', as: 'userdetails' })
    }
  }

  Address.init({
    Address_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    AddressLine1: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    AddressLine2: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    City_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Country_Id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Postal_Code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true
    },
    Longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'Addresses',
    timestamps: true
  });

  return Address;
};
