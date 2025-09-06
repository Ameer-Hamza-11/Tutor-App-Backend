'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Languages extends Model {
    static associate(models) {
      Languages.hasMany(models.User_Languages, { foreignKey: 'Language_Id', as: 'user_languages' })
    }
  }

  Languages.init({
    Language_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Language_Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Language_Code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Is_Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Languages',
    tableName: 'Languages',
    timestamps: true
  });

  return Languages;
};
