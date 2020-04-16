'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      productId: {
        type: Sequelize.STRING,
        primaryKey:true,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productURL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productImageURL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productSalePrice: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};