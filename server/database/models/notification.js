"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      productId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      previousPrice: DataTypes.DECIMAL,
      currentPrice: DataTypes.DECIMAL,
      dismissed: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
  Notification.associate = function (models) {
    // associations can be defined here
    Notification.belongsTo(models.Products, { foreignKey: "productId" });
    Notification.belongsTo(models.Users, { foreignKey: "userId" });
  };
  return Notification;
};
