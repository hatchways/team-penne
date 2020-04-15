require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary");
const formData = require("express-form-data");
const router = express.Router();
const { addItemList, getItemLists, getItemList } = require("../db/modelDB");

cloudinary.config({
  cloud_name: "dtfapvikl",
  api_key: "143847534742289",
  api_secret: "DD8YwfqGHJ5BJ6x7VhW5NUb2uvU",
});

router.use(formData.parse());

router.post("/image-upload", async (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map((image) =>
    cloudinary.uploader.upload(image.path)
  );

  Promise.all(promises).then((results) => {
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
    image: req.body.listPicture,
  };
  addItemList(itemList);
  res.status(200).send();
});

module.exports = router;
