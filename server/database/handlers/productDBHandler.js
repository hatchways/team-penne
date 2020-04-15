const models = require('../models');
const Product = models.Products;
const ListProducts = models.ListProducts;

/*
    getAllProductsbyListId - get all the products associated with a certain listID
    arguments: listID - id of list who's products we have  to retrieve
    return: list of products
*/
async function getAllProductsbyListId(listId){
    let allProducts = await ListProducts.findAll({where: { listId: listId }})
        .then(function(listProducts){
            return await Product.findAll({where: {productId: listProducts.productId}});
        });
    return allProducts
}


module.exports = { 
    getAllProductsbyListId,
  };