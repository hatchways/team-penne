var socketio = require("socket.io");

const models = require("../models");
const Notification = models.Notification;
const Product = models.Products;
const List = models.Lists;
const ListProduct = models.ListProducts;
const CronJob = require("cron").CronJob;
const { scrapeAmazon, scrapeEbay } = require("../../scrapers/index");
const { getProductIfExists } = require("./productDBHandler");

const createNotification = async function(
  create_productId,
  create_userId,
  create_previousPrice,
  create_currentPrice
) {
  // check if notification with id exists
  // if it doesn't exist, create it
  // if it exists, update it.
  const notification = await Notification.findOne({
    attributes: [
      "id",
      "productId",
      "userId",
      "previousPrice",
      "currentPrice",
      "dismissed"
    ],
    where: { productId: create_productId, userId: create_userId }
  })
    .then(res => {
      // notification exists, update for user
      console.log("Notification already exists. Updating.");
      res.previousPrice = create_previousPrice;
      res.currentPrice = create_currentPrice;
      res.dismissed = false;
      res.save();

      return res;
    })
    .catch(async () => {
      // notification doesn't exist, create for user
      let createdNotification = await Notification.create({
        productId: create_productId,
        userId: create_userId,
        previousPrice: create_previousPrice,
        currentPrice: create_currentPrice,
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
      return createdNotification;
    });
  return notification;
};

const getProductListIds = async function(productId) {
  const listIds = await ListProduct.findAll({
    attributes: ["listId", "productId"],
    where: { productId: productId }
  })
    .then(res => {
      const ids = [];
      for (let i = 0; i < res.length; i++) {
        ids.push(res[i].listId);
      }
      return ids;
    })
    .catch(err => console.log(err));
  return listIds;
};

const getListUserId = async function(listId) {
  const userId = await List.findOne({
    attributes: ["listId", "listName", "listImageURL", "userId"],
    where: { listId: listId }
  })
    .then(res => {
      return res.userId;
    })
    .catch(err => console.log(err));
  return userId;
};

const createNotifications = async function(socket, socketClients) {
  await Product.findAll()
    .then(async products => {
      for (let i = 0; i < products.length; i++) {
        const url = products[i].productURL;
        const website = url.split(".")[1];
        if (website === "amazon") {
          await scrapeAmazon(url)
            .then(async res => {
              // Check if salePrice exists and has changed
              // OR if productSalePrice exists, but salePrice doesn't (i.e. Product not on sale anymore)
              // OR if the productPrice has changed
              //    and if it has, update the product
              if (
                (res.salePrice != null &&
                  res.salePrice != products[i].productSalePrice) ||
                (res.salePrice == null &&
                  products[i].productSalePrice != null) ||
                res.price != products[i].productPrice
              ) {
                var updatePreviousPrice;
                var updateCurrentPrice;
                // these values only remain if the product isn't on sale
                // if product IS on sale, then technically, these two SHOULD be the same
                //    but is irrelevant, as they'll be updated later anyway
                updatePreviousPrice = products[i].productPrice;
                updateCurrentPrice = res.price;

                // if res.salePrice doesn't exist, then set it to null
                products[i].productSalePrice = res.salePrice || null;
                products[i].productPrice = res.price;
                products[i].save();

                // Update the values of updatePreviousPrice and updateCurentPrice
                // if productSalePrice exists i.e. product is on sale
                if (products[i].productSalePrice) {
                  updatePreviousPrice = products[i].productPrice;
                  updateCurrentPrice = products[i].productSalePrice;
                }

                const listIds = await getProductListIds(
                  products[i].productId
                ).catch(err => console.log(err));
                // for all listIds in which this product exists
                // get the userId for that list, and create/update a notification
                // for that user
                for (let j = 0; j < listIds.length; j++) {
                  const userId = await getListUserId(listIds[j]);
                  // send data via socketClients if userId has a socket open
                  if (socketClients[userId] != null) {
                    let payloadProduct = {
                      id: products[i].productId,
                      image: products[i].productImageURL,
                      name: products[i].productName,
                      url: products[i].productURL,
                      currency: products[i].productCurrency,
                      price: updatePreviousPrice,
                      salePrice: updateCurrentPrice
                    };
                    socket
                      .to(socketClients[userId])
                      .emit("getNotifications", payloadProduct);
                  }

                  // function that creates/updates notifications
                  await createNotification(
                    products[i].productId,
                    userId,
                    updatePreviousPrice,
                    updateCurrentPrice
                  );
                }
              }
            })
            .catch(err => console.log(err));
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
    })
    .catch(err => console.log(err));
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
  })
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
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
        id: userIdNotifications[i].dataValues.productId,
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

const updateNotification = async function(userId, productId, dismissed) {
  const notification = await Notification.findOne({
    attributes: [
      "id",
      "productId",
      "userId",
      "previousPrice",
      "currentPrice",
      "dismissed"
    ],
    where: { productId: productId, userId: userId }
  }).catch(err => {
    console.log(err);
    return err;
  });
  notification.dismissed = dismissed;
  notification.save();
};

const checkForSales = async function(socket, socketClients) {
  const salesCheck = new CronJob("30 * * * *", function() {
    createNotifications(socket, socketClients);
    let date_ob = new Date();
    console.log(`Last Checked: ${date_ob}`);
  });
  salesCheck.start();
};

module.exports = {
  checkForSales,
  getNotifications,
  getProductsForNotifications,
  updateNotification
};
