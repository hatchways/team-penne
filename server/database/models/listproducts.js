'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListProducts = sequelize.define('ListProducts', {
    listId: DataTypes.INTEGER,
    productId: DataTypes.STRING
  }, {});
  ListProducts.associate = function(models) {
    // associations can be defined here
    ListProducts.belongsTo(models.Lists, {foreignKey: 'listId'})
    ListProducts.belongsTo(models.Products, {foreignKey: 'productId'})
  };
  return ListProducts;
};