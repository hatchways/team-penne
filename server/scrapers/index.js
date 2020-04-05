const puppeteer = require("puppeteer");
const avoidDetection = require("./util");

const __launchPuppeteer = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await avoidDetection(page);

  await page.goto(url);
  return page;
};

const scrapeAmazon = async (url) => {
  const page = await __launchPuppeteer(url);

  const item = await page.evaluate(() => {
    let title = document
      .getElementById("productTitle")
      .innerHTML.split("\n")[9];

    while (title.charAt(0) === " ") {
      title = title.split("");
      title.splice(0, 1);
      title = title.join("");
    }

    const price = document.getElementById("priceblock_ourprice").innerHTML;

    const listPrice = document.getElementsByClassName(
      "priceBlockStrikePriceString"
    )[0];

    return listPrice
      ? { title, price, listPrice: listPrice.innerHTML, sale: true }
      : { title, price, sale: false };
  });

  return item;
};

const scrapeEbay = async (url) => {
  const page = await __launchPuppeteer(url);

  let item;
  try {
    item = await page.evaluate(() => {
      let title;
      if (document.getElementById("itemTitle")) {
        title = document
          .getElementById("itemTitle")
          .innerHTML.split("</span>")[1];
      } else if (document.getElementsByClassName("product-title")) {
        title = document.getElementsByClassName("product-title")[0].innerHTML;
      }
      let price;
      if (document.getElementById("prcIsu")) {
        price = document.getElementById("prcIsu").innerHTML.split(" ")[1];
      } else if (document.getElementById("prcIsum")) {
        price = document.getElementById("prcIsum").innerHTML;
      } else if (document.getElementsByClassName("display-price")) {
        price = document.getElementsByClassName("display-price")[0].innerHTML;
      }
      let listPrice;

      if (document.getElementsByClassName("additional-price")[1]) {
        listPrice = document
          .getElementsByClassName("additional-price")[1]
          .innerHTML.split(">")[1]
          .split("</span")[0];
      } else if (document.getElementById("mm-SaleOrgPrc")) {
        listPrice = document
          .getElementById("mm-saleOrgPrc")
          .innerHTML.split(" ")[1];
      }
      return listPrice
        ? { title, price, listPrice, sale: true }
        : { title, price, sale: false };
    });
  } catch (err) {
    return { error: "Scraping website failed" };
  }
  return item;
};

const testScraper = async () => {
  const testUrl =
    "https://intoli.com/blog/" +
    "not-possible-to-block-chrome-headless/chrome-headless-test.html";
  const page = await __launchPuppeteer(testUrl);

  await page.screenshot({ path: "headless-test-result.png" });
};

module.exports = {
  scrapeAmazon,
  scrapeEbay,
  testScraper,
};