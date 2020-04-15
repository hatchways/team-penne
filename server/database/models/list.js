'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    listId: DataTypes.INTEGER,
    listName: DataTypes.STRING,
    listImageURL: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.belongsTo(models.User, {
      foreignKey: 'userId', 
      as: 'user'
    });
    List.belongsToMany(models.Product, {
      through: 'ListProducts', 
      foreignKey: 'listId', 
      as: 'list'
    })
  };
  return List;
};