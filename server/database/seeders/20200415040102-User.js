'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    queryInterface.bulkInsert(
      'Users',
      [
        {
          userName: 'Jon Snow',
          userEmail: 'JonSnow@example.com',
          userPassword: 'nothing',
          userImageURL: ''
        },
        {
          userName: 'Khal Drogo',
          userEmail: 'KhalDrogo@example.com',
          userPassword: 'password',
          userImageURL: ''
        },
      ],{});
  },


  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    queryInterface.bulkDelete('Users', null, {});
  },
};
