const models = require("../models");
const Notification = models.Notification;
const Product = models.Products;
const User = models.Users;
const List = models.Lists;
const ListProduct = models.ListProducts;
const CronJob = require("cron").CronJob;
const { scrapeAmazon, scrapeEbay } = require("../../scrapers/index");
const { getProductIfExists } = require("./productDBHandler");

const createNotification = async function(
  productId,
  userId,
  previousPrice,
  currentPrice
) {
  const notification = await Notification.create({
    productId: productId,
    userId: userId,
    previousPrice: previousPrice,
    currentPrice: currentPrice,
    dismissed: false
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      console.log("Notification not created.");
      return null;
    });
  return notification;
};

const getProductListIds = async function(productId) {
  const listIds = await ListProduct.findAll({
    attributes: ["listId", "productId"],
    where: { productId: productId }
  }).then(res => {
    const ids = [];
    for (let i = 0; i < res.length; i++) {
      ids.push(res[i].listId);
    }
    return ids;
  });
  return listIds;
};

const getListUserId = async function(listId) {
  const userId = await List.findOne({
    attributes: ["listId", "listName", "listImageURL", "userId"],
    where: { listId: listId }
  }).then(res => {
    return res.userId;
  });
  return userId;
};

const createNotifications = async function() {
  await Product.findAll().then(async products => {
    for (let i = 0; i < products.length; i++) {
      const url = products[i].productURL;
      const website = url.split(".")[1];
      if (website === "amazon") {
        await scrapeAmazon(url).then(async res => {
          if (res.salePrice) {
            if (res.salePrice !== products[i].productSalePrice) {
              products[i].productSalePrice = res.salePrice;
              products[i].save();
              const listIds = await getProductListIds(products[i].productId);
              for (let j = 0; j < listIds.length; j++) {
                const userId = await getListUserId(listIds[j]);
                await createNotification(
                  products[i].productId,
                  userId,
                  products[i].productPrice,
                  products[i].productSalePrice
                );
              }
            }
          }
        });
      } else if (website === "ebay") {
        await scrapeEbay(url).then(async res => {
          if (res.salePrice) {
            if (res.salePrice !== products[i].productSalePrice) {
              products[i].productSalePrice = res.salePrice;
              products[i].save();
              const listIds = await getProductListIds(products[i].productId);
              for (let j = 0; j < listIds.length; j++) {
                const userId = await getListUserId(listIds[j]);
                await createNotification(
                  products[i].productId,
                  userId,
                  products[i].productPrice,
                  products[i].productSalePrice
                );
              }
            }
          }
        });
      }
    }
  });
};

const getNotifications = async function(userId) {
  const notifications = await Notification.findAll({
    attributes: [
      "productId",
      "userId",
      "previousPrice",
      "currentPrice",
      "dismissed"
    ],
    where: { userId: userId, dismissed: false }
  }).then(res => {
    return res;
  });
  return notifications;
};

const getProductsForNotifications = async function(userId) {
  // userIdNotifications.dataValues = values of all notifications
  // dataValues: productId, userId, previousPrice, currentPrice, dismissed
  let userIdNotifications = await getNotifications(userId);
  var i;
  var notificationsList = [];
  for (i = 0; i < userIdNotifications.length; i++) {
    /* saleProduct.dataValues = {
        productId, 
        productName, 
        productURL, 
        productImageURL, 
        productCurrency, 
        productPrice, 
        productSalePrice }*/
    let saleProduct = await getProductIfExists(
      userIdNotifications[i].dataValues.productId
    ); // #TODO // if saleProduct == null, remove notification?
    if (saleProduct != null) {
      //append saleProduct to notificationsList
      let displayProduct = {
        name: saleProduct.productName,
        image: saleProduct.productImageURL,
        url: saleProduct.productURL,
        salePrice: saleProduct.productSalePrice,
        currency: saleProduct.productCurrency,
        price: saleProduct.productPrice,
        dismissed: userIdNotifications[i].dataValues.dismissed
      };
      notificationsList.push(displayProduct);
    }
  }
  return notificationsList;
};

const checkForSales = async function() {
  const salesCheck = new CronJob("*/2 * * * *", async function() {
    createNotifications();
    console.log("Cron Job is running");
  });
  salesCheck.start();
};

module.exports = {
  getNotifications,
  checkForSales,
  getProductsForNotifications
};
