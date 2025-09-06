'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSubjects extends Model {
    static associate(models) {
      UserSubjects.belongsTo(models.Users, {
        foreignKey: 'User_Id',
        as: 'user'
      });
      UserSubjects.belongsTo(models.Subjects, {
        foreignKey: 'Subject_Id',
        as: 'subject'
      });
    }
  }
  UserSubjects.init({
    User_Subject_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    User_Id: DataTypes.INTEGER,
    Subject_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSubjects',
    tableName: 'UserSubjects',
    timestamps: true
  });
  return UserSubjects;
};
