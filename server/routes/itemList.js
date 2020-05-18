require("dotenv").config();
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const formData = require("express-form-data");

const { authCheck } = require("./authCheck");
const {
  addList,
  deleteList,
  getAllListsWithValues,
  getListIdByListName
} = require("../database/handlers/listDBHandler");
const {
  getAllProductsbyListId,
  addProductToList,
  removeProductFromList
} = require("../database/handlers/productDBHandler");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

router.use(formData.parse());

// upload image when the user adds an image to the list
router.post("/image-upload", async (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise.all(promises).then(results => {
    res.json(results[0]);
  });
});

/*
 ************** LIST REQUESTS ***************
 */
// POST - create a new list, and assign it to user userId, with name and picture in req.body
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

// POST - remove a certain list for a userId
router.post("/remove-list", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  const listName = req.body.listName;
  console.log(`Removing list ${listName} for userid ${currentUserId}`);
  res.status(200).send({ message: "List removed!" });
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

/*
 ************ PRODUCT REQUESTS *************
 */
// POST - add items to a list
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

//POST - add a product defined in req.body to list: listName (req.body.listName)
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
