'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userImageURL: {
        type: Sequelize.STRING,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};