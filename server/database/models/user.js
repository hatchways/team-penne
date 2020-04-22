"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 0,
        autoIncrement: true,
      },
      userName: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      userPassword: DataTypes.STRING,
      userImageURL: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Lists, { as: "list" });
    Users.hasMany(models.Notification, { as: "notification" });
  };
  return Users;
};
