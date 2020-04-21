const models = require("../models");
const Notification = models.Notification;
const Product = models.Products;
const CronJob = require("cron").CronJob;
const { scrapeAmazon, scrapeEbay } = require("../../scrapers/index");

function reformatProductStyle(Products) {
  var formattedList = [];
  for (i = 0; i < Products.length; i++) {
    var tempProductsItem = {
      productId: Products[i].productId,
      productName: Products[i].productName,
      productURL: Products[i].productURL,
      productImageURL: Products[i].productImageURL,
      productCurrency: Products[i].productCurrency,
      productPrice: Products[i].productPrice,
      productSalePrice: Products[i].productSalePrice,
    };
    formattedList.push(tempProductsItem);
  }
  return formattedList;
}

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
    dismissed: false,
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

async function createNotifications(updatedProducts, userId) {
  const notifications = [];
  for (let i = 0; i < updatedProducts.length; i++) {
    const product = updatedProducts[i];
    const notification = await createNotification(
      product.productId,
      userId,
      product.productPrice,
      product.productSalePrice
    );
    notifications.push(notification);
  }
  return notifications;
}

const getUpdatedProducts = async function () {
  const productsOnSale = await Product.findAll().then(async (products) => {
    const updatedProducts = [];
    for (let i = 0; i < products.length; i++) {
      const url = products[i].productURL;
      const website = url.split(".")[1];
      if (website === "amazon") {
        const updatedProduct = await scrapeAmazon(url).then((res) => {
          if (res.salePrice) {
            if (res.salePrice !== products[i].productSalePrice) {
              products[i].productSalePrice = res.salePrice.toString();
              products[i].save();
              return products[i];
            }
          }
        });
        if (updatedProduct) {
          updatedProducts.push(updatedProduct);
        }
      } else if (website === "ebay") {
        const updatedProduct = await scrapeEbay(url).then((res) => {
          if (res.salePrice) {
            if (res.salePrice !== products[i].productSalePrice) {
              products[i].productSalePrice = res.salePrice.toString();
              products[i].save();
              return products[i];
            }
          }
        });
        if (updatedProduct) {
          updatedProducts.push(updatedProduct);
        }
      }
    }
    return updatedProducts;
  });
  return reformatProductStyle(productsOnSale);
};

const checkForSales = async function () {
  const salesCheck = new CronJob("*/2 * * * *", async function () {});
  salesCheck.start();
};

module.exports = { createNotifications, checkForSales, getUpdatedProducts };
