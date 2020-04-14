'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    userImageURL: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.List, {as: 'list'})
  };
  return User;
};