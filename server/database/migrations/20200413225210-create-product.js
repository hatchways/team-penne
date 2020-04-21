"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
      productId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productURL: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      productImageURL: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      productCurrency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      productSalePrice: {
        type: Sequelize.DECIMAL,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  },
};
