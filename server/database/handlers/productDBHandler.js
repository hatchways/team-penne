const models = require("../models");
const Product = models.Products;
const ListProducts = models.ListProducts;
const CronJob = require("cron").CronJob;

/*
    getAllProductsbyListId - get all the products associated with a certain listID
    arguments: listID - id of list who's products we have  to retrieve
    return: list of products
*/
async function getAllProductsbyListId(listId) {
  let allProducts = await ListProducts.findAll({
    where: { listId: listId },
  }).then(async function (listProducts) {
    return await Product.findAll({
      where: { productId: listProducts.productId },
    });
  });
  return allProducts;
}

const getSalePrices = new CronJob("** 02 ** ** **", async function () {
  await Product.findAll().then((products) => {
    products.map((product) => {
      fetch(`/scrape?url=${product.productURL}`).then((res) => {
        if (res.sale) {
          product.productSalePrice = res.listPrice;
          product.save();
        }
      });
    });
  });
});

module.exports = {
  getAllProductsbyListId,
  getSalePrices,
};
