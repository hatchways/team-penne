"use strict";

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
      "Products",
      [
        {
          productId: "B07S1DNLZ1",
          productName:
            "Zengjo Sports T Shirt Men, Quick Dry Gym T Shirt Men’s Running Top Short Sleeve",
          productURL:
            "https://www.amazon.ca/Zengjo-Sports-Running-Sleeve-Marled/dp/B07S1DNLZ1/ref=pd_ybh_a_1?_encoding=UTF8&psc=1&refRID=CP24W1YQJ39N9M91MJDC",
          productImageURL:
            "https://images-na.ssl-images-amazon.com/images/I/715fjbtzJnL._AC_UX679_.jpg",
          productCurrency: "CDN",
          productPrice: 22.98,
          productSalePrice: 19.98,
        },
        {
          productId: "B01L8JJ57K",
          productName: "Hanes Mens EcoSmart Fleece Sweatshirt Sweatshirt",
          productURL:
            "https://www.amazon.ca/Hanes-Ecosmart-Fleece-Sweatshirt-Black/dp/B01L8JJ57K/ref=pd_ybh_a_3?_encoding=UTF8&psc=1&refRID=CP24W1YQJ39N9M91MJDC",
          productImageURL:
            "https://images-na.ssl-images-amazon.com/images/I/81aIrOfU76L._AC_UX679_.jpg",
          productCurrency: "CDN",
          productPrice: 12.99,
          productSalePrice: null,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    queryInterface.bulkDelete("Products", null, {});
  },
};
