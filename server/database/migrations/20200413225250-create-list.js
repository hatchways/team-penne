'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lists', {
      listId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: 0,
      },
      listName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      listImageURL: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Users',
          key: 'userId',
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Lists');
  }
};