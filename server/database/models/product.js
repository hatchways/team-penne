'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    productId: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: "",
    },
    productName: DataTypes.STRING,
    productURL: DataTypes.STRING,
    productImageURL: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    productSalePrice: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsToMany(models.Lists, {
      through: 'ListProducts', 
      foreignKey: 'productId', 
      as: 'product'
    })
  };
  return Products;
};