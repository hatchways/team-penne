'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {
    userIdFollower: DataTypes.INTEGER,
    userIdFollowee: DataTypes.INTEGER
  }, {});
  Followers.associate = function(models) {
    // associations can be defined here
  };
  return Followers;
};