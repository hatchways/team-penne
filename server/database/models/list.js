'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define('Lists', {
    listId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: 0,
      autoIncrement: true,
    },
    listName: DataTypes.STRING,
    listImageURL: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    timestamps: false
  });
  Lists.associate = function(models) {
    // associations can be defined here
    Lists.belongsTo(models.Users, {
    });
    Lists.belongsToMany(models.Products, {
      through: 'ListProducts', 
      foreignKey: 'listId', 
      as: 'list'
    })
  };
  return Lists;
};