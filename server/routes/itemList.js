require("dotenv").config();
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const formData = require("express-form-data");

const { addItemList, getItemLists, getItemList } = require("../db/modelDB");
const { authCheck } = require("./authCheck");
const {
  addList,
  getAllListsWithValues,
  getListIdByListName
} = require("../database/handlers/listDBHandler");
const {
  getAllProductsbyListId,
  addProductToList,
  removeProductFromList
} = require("../database/handlers/productDBHandler");

cloudinary.config({
  cloud_name: "dtfapvikl",
  api_key: "143847534742289",
  api_secret: "DD8YwfqGHJ5BJ6x7VhW5NUb2uvU"
});

router.use(formData.parse());

router.post("/image-upload", async (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise.all(promises).then(results => {
    res.json(results[0]);
  });
});

router.get("/lists", async (req, res) => {
  res.status(200).send({ itemLists: getItemLists() });
});

router.get("/lists/:name", async (req, res) => {
  let itemList = getItemList(req.params.name);
  res.status(200).send({ itemList: itemList });
});

router.post("/", async (req, res) => {
  let itemList = {
    name: req.body.listName,
    amount: 0,
    image: req.body.listPicture
  };
  addItemList(itemList);
  res.status(200).send();
});

// create a new list, and assign it to user userId, with name and picture in req.body
router.post("/add-lists", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  addList(currentUserId, req.body.listName, req.body.listPicture)
    .then(function(ret) {
      res.status(200).send({ message: "Added List." });
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({ err });
    });
});

// GET - retrieve all Lists for current user
router.get("/get-lists", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  let allLists = await getAllListsWithValues(currentUserId)
    .then(function(allLists) {
      return allLists;
    })
    .catch(function(err) {
      console.log(err);
    });
  // Output "Test" for testing value of allLists coming out of "getAllListsWithValues"
  //console.log(allLists[0].products);
  return res.status(200).send({ itemLists: allLists });
});

// GET - retrieve all Lists for current user
router.get("/get-product-list", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  const listName = req.query.listName;

  const currentList = await getListIdByListName(currentUserId, listName);
  const currentListProducts = await getAllProductsbyListId(currentList.listId);
  return res.status(200).send({ productList: currentListProducts });
});

router.post("/add-items", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  var itemAddedBool = await addProductToList(
    req.body.productId,
    req.body.productName,
    req.body.productURL,
    req.body.productImageURL,
    req.body.productCurrency,
    req.body.productPrice,
    req.body.productSalePrice,
    currentUserId,
    req.body.listName
  );
  return res.status(200).send({ message: "Item Added." });
});

//add a product defined in req.body to list: listName (req.body.listName)
router.post("/remove-item", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;

  let productRemovedBool = await removeProductFromList(
    req.body.productId,
    req.body.productName,
    req.body.productURL,
    req.body.productImageURL,
    req.body.productCurrency,
    req.body.productPrice,
    req.body.productSalePrice,
    currentUserId,
    req.body.listName
  );

  let message = productRemovedBool
    ? "Item Removed"
    : "There was a problem removing the product.";
  return res.status(200).send({ message: message });
});

module.exports = router;
