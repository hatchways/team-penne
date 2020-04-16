"use strict";
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      productId: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: ""
      },
      productName: DataTypes.STRING,
      productURL: DataTypes.TEXT,
      productImageURL: DataTypes.TEXT,
      productCurrency: DataTypes.STRING,
      productPrice: DataTypes.DECIMAL,
      productSalePrice: DataTypes.DECIMAL
    },
    {
      timestamps: false
    }
  );
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsToMany(models.Lists, {
      through: "ListProducts",
      foreignKey: "productId",
      as: "product"
    });
  };
  return Products;
};
