"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      previousPrice: {
        type: Sequelize.DECIMAL,
      },
      currentPrice: {
        type: Sequelize.DECIMAL,
      },
      dismissed: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Notifications");
  },
};
