const models = require("../models");
const Product = models.Products;
const ListProducts = models.ListProducts;
const List = models.Lists;

function reformatProductStyle(Products) {
  var formattedList = [];
  for (i = 0; i < Products.length; i++) {
    var tempProductsItem = {
      productName: Products[i].productName,
      productURL: Products[i].productURL,
      productImageURL: Products[i].productImageURL,
      productCurrency: Products[i].productCurrency,
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
  var foundProduct = await Product.findOne({
    attributes: [
      "productId",
      "productName",
      "productURL",
      "productImageURL",
      "productCurrency",
      "productPrice",
      "productSalePrice"
    ],
    where: { productId: productId }
  })
    .then(product => {
      return product;
    })
    .catch(err => {
      //console.log("No Products in list");
      return null;
    });
  return foundProduct;
}

async function checkIfProductInList(productId, listId) {
  const inListBool = await ListProducts.findOne({
    attributes: ["listId", "productId"],
    where: { listId: listId, productId: productId }
  })
    .then(res => {
      if (res == null) return false;
      else return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
  return inListBool;
}

/*
    getAllProductsbyListId - get all the products associated with a certain listID
    arguments: listID - id of list who's products we have  to retrieve
    return: list of products
*/
async function getAllProductsbyListId(listId) {
  var allProducts = await ListProducts.findAll({
    attributes: ["listId", "productId"],
    where: { listId: listId }
  })
    .then(async listProducts => {
      var i;
      var listOfProducts = [];
      for (i = 0; i < listProducts.length; i++) {
        var productForList = await Product.findOne({
          attributes: [
            "productId",
            "productName",
            "productURL",
            "productImageURL",
            "productCurrency",
            "productPrice",
            "productSalePrice"
          ],
          where: { productId: listProducts[i].productId }
        })
          .then(res => {
            return res;
          })
          .catch(err => {
            // Product exists in ListProducts Table, but not in Products Table (??)
            console.log(err);
            return [];
          });
        listOfProducts.push(productForList);
      }
      return listOfProducts;
    })
    .catch(function(err) {
      // Empty Products Table
      console.log("Empty Products Table.");
      //console.log(err);
      return [];
    })
    .catch(err => {
      return [];
    });
  return reformatProductStyle(allProducts);
}

async function getListIdFromUser(listName, userId) {
  var returnedListId = await List.findOne({
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
  return returnedListId.listId;
}

async function addProductToList(
  productId,
  productName,
  productURL,
  productImageURL,
  productCurrency,
  productPrice,
  productSalePrice,
  userId,
  listName
) {
  // Step 1
  // Get the listId from userId and listName
  var listId = await getListIdFromUser(listName, userId);
  if (listId == null) return false; // specified list doesn't exist.

  // Step 2
  // Create a new product, and add it to the Products Table
  // If product already exists, retrieve product for step 3
  var newProduct = await getProductIfExists(productId);
  if (newProduct == null) {
    newProduct = await Product.create({
      productId: productId,
      productName: productName,
      productURL: productURL,
      productImageURL: productImageURL,
      productCurrency: productCurrency,
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
  const productInListBool = await checkIfProductInList(
    newProduct.productId,
    listId
  );
  if (productInListBool) return false; // Product Already in specified List.
  ListProducts.create({
    productId: productId,
    listId: listId
  });
  return true;
}

module.exports = {
  getAllProductsbyListId,
  addProductToList,
};
