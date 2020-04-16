const models = require("../models");
const Product = models.Products;
const ListProducts = models.ListProducts;

function reformatProductStyle(Products) {
  var formattedList = [];
  for (i = 0; i < Products.length; i++) {
    var tempProductsItem = {
      productName: Products[i].productName,
      productURL: Products[i].productURL,
      productImageURL: Products[i].productImageURL,
      productPrice: Products[i].productPrice,
      productSalePrice: Products[i].productSalePrice
    };
    formattedList.push(tempProductsItem);
  }
  return formattedList;
}

/*
        #TODO
    checkListExists: check if list(with listName) exists for user(with userId)
    arguments: userId of current user, listName of list to be checked (if exists)
    return: true if exists, false if doesn't exist
*/
async function getProductIfExists(productId) {
  var foundProduct = Product.findOne({
    attributes: [
      "productId",
      "productName",
      "productURL",
      "productImageURL",
      "productPrice",
      "productSalePrice"
    ],
    where: { productId: productId }
  })
    .then(product => {
      return product;
    })
    .catch(err => {
      console.log("No Products in list");
      return {};
    });
  return foundProduct;
}

/*
    getAllProductsbyListId - get all the products associated with a certain listID
    arguments: listID - id of list who's products we have  to retrieve
    return: list of products
*/
async function getAllProductsbyListId(listId) {
  let allProducts = await ListProducts.findAll({
    attributes: ["listId", "productId"],
    where: { listId: listId }
  })
    .then(async function(listProducts) {
      return await Product.findAll({
        attributes: [
          "productId",
          "productName",
          "productURL",
          "productImageURL",
          "productPrice",
          "productSalePrice"
        ],
        where: { productId: listProducts.productId }
      });
    })
    .catch(function(err) {
      // Empty Products Table
      //console.log(err);
      return [];
    });
  return reformatProductStyle(allProducts);
}

async function addProductToList(
  productId,
  productName,
  productURL,
  productImageURL,
  productPrice,
  productSalePrice,
  userId,
  listName
) {
  // Step 1
  // Get the listId from userId and listName
  var listId = List.findOne({
    attributes: ["listId", "listName", "listImageURL"],
    where: { listName: listName, userId: userId }
  })
    .then(listId => {
      return listId;
    })
    .catch(err => {
      console.log(err);
      return null;
    });

  if (listId == null) return false; // specified list doesn't exist.

  // Step 2
  // Create a new product, and add it to the Products Table
  // If product already exists, retrieve product for step 3
  var newProduct = await getProductIfExists(productId);
  if (newProduct == null) {
    newProduct = Product.create({
      productId: productId,
      productName: productName,
      productURL: productURL,
      productImageURL: productImageURL,
      productPrice: productPrice,
      productSalePrice: productSalePrice
    })
      .then(function(res) {
        //console.log(res);
        return res;
      })
      .catch(function(err) {
        console.log(err);
        console.log("Product Not Added.");
        return null;
      });
  }

  if (newProduct == null) return false; // if the product wasn't found or created

  // Step 3
  // Add it and it's relationship with listId to the productLists table.

  return true;
}
module.exports = {
  getAllProductsbyListId,
  addProductToList
};
