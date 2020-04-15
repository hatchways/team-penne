'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define('Lists', {
    listId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    listName: DataTypes.STRING,
    listImageURL: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Lists.associate = function(models) {
    // associations can be defined here
    Lists.belongsTo(models.Users, {
      foreignKey: 'userId', 
      as: 'user'
    });
    Lists.belongsToMany(models.Products, {
      through: 'ListProducts', 
      foreignKey: 'listId', 
      as: 'list'
    })
  };
  return Lists;
};