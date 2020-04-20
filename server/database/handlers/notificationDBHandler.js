const models = require("../models");
const Notification = models.Notification;
const Product = models.Products;
const CronJob = require("cron").CronJob;
const { scrapeAmazon, scrapeEbay } = require("../../scrapers/index");

async function createNotification(
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
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      console.log("Notification not created.");
      return null;
    });
  return notification;
}

const getSalePrices = async function () {
  const notifications = [];
  await Product.findAll().then((products) => {
    products.map((product) => {
      const url = product.productURL;
      const website = url.split(".")[1];
      if (website === "amazon") {
        scrapeAmazon(url).then((res) => {
          if (res.salePrice) {
            product.productSalePrice = res.salePrice.toString();
            product.save();
            const notification = createNotification(
              product.dataValues.productId,
              1,
              product._previousDataValues.productPrice,
              product.dataValues.productSalePrice
            );
            notifications.push(notification);
          }
        });
      } else if (website === "ebay") {
        scrapeEbay(url).then((res) => {
          if (res.salePrice) {
            product.productSalePrice = res.salePrice.toString();
            product.save();
            const notification = createNotification(
              product.dataValues.productId,
              1,
              product.dataValues.productPrice,
              product.dataValues.productSalePrice
            );
            notifications.push(notification);
          }
        });
      }
    });
  });
  return notifications;
};

const checkForSales = async function () {
  const salesCheck = new CronJob("*/2 * * * *", async function () {
    await getSalePrices();
  });
  salesCheck.start();
};

module.exports = { checkForSales, getSalePrices };
