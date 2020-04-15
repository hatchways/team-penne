'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ListProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      listId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Lists',
          key: 'listId',
        },
      },
      productId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Products',
          key: 'productId',
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ListProducts');
  }
};