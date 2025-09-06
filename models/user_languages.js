'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Languages extends Model {
    static associate(models) {
      User_Languages.belongsTo(models.Users, {
        foreignKey: 'User_Id',
        as: 'user'
      });
      User_Languages.belongsTo(models.Languages, {
        foreignKey: 'Language_Id',
        as: 'language'
      });
    }
  }

  User_Languages.init({
    User_Language_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Language_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Proficiency_Level: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    Score: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User_Languages',
    tableName: 'User_Languages',
    timestamps: true
  });

  return User_Languages;
};
