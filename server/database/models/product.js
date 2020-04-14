'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productId: DataTypes.STRING,
    productName: DataTypes.STRING,
    productURL: DataTypes.STRING,
    productImageURL: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    productSalePrice: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.List, {
      through: 'ListProducts', 
      foreignKey: 'productId', 
      as: 'product'
    })
  };
  return Product;
};