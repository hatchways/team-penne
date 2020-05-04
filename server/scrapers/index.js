const puppeteer = require("puppeteer");
const avoidDetection = require("./util");

var browser;
const __launchPuppeteer = async url => {
  browser = await puppeteer
    .launch({ headless: true })
    .catch(err => console.log(err));
  const page = await browser.newPage().catch(err => {
    console.log(err);
  });

  await avoidDetection(page).catch(err => console.log(err));
  await page.goto(url).catch(err => console.log(err));

  return page;
};

const scrapeAmazon = async url => {
  const page = await __launchPuppeteer("https://www.amazon.com/").catch(err => {
    console.log(err);
    return -1;
  });

  await page.goto(url);

  const splitUrl = url.split("/");
  var productId = "";
  for (i = 0; i < splitUrl.length; i++) {
    if (splitUrl[i] == "dp") {
      productId = splitUrl[i + 1];
      break;
    }
  }
  productId = productId.split("?")[0];

  const item = await page
    .evaluate(() => {
      let title = document
        .getElementById("productTitle")
        .innerHTML.split("\n")[9];
      while (title.charAt(0) === " ") {
        title = title.split("");
        title.splice(0, 1);
        title = title.join("");
      }

      var priceHTML;
      // try block if product doesn't exist/unavailable
      try {
        // try block to catch price ids of different names
        try {
          priceHTML = document.getElementById("priceblock_ourprice").innerHTML;
        } catch {
          priceHTML = document.getElementById("priceblock_dealprice").innerHTML;
        }
        // sometimes prices have two "prices"
        // e.g. $25-$35.
        // This if statement catches that, and parses it correctly
        if (priceHTML.split(" - ")[1] != null) {
          let priceHTMLSplit = priceHTML.split(" - ")[1].split("&nbsp;");
          let currency = priceHTMLSplit[0];
          let priceString = priceHTMLSplit[1].replace(",", ""); //if price = $1,349, get rid of comma
          let priceSplit = priceString.split("."); // split string by decimal point
          let priceFH = parseInt(priceSplit[0], 10); // FH = first half (i.e Integer part)
          let priceSH = parseInt(priceSplit[1], 10) / 100; // SH = second half (i.e. Decimal part)
          var priceUpper = priceFH + priceSH;
          priceHTML = priceHTML.split(" - ")[0];
        }
        const priceHTMLSplit = priceHTML.split("&nbsp;");
        var currency = priceHTMLSplit[0];
        var priceString = priceHTMLSplit[1].replace(",", ""); //if price = $1,349, get rid of comma
        var priceSplit = priceString.split("."); // split string by decimal point
        const priceFH = parseInt(priceSplit[0], 10); // FH = first half (i.e Integer part)
        const priceSH = parseInt(priceSplit[1], 10) / 100; // SH = second half (i.e. Decimal part)
        var price = priceFH + priceSH;
      } catch {
        var price = 0;
        var currency = "";
      }

      if (priceUpper != null) {
        let tempPrice = priceUpper;
        priceUpper = price;
        price = tempPrice;
      }

      // At this point, price is the value that will always be output to the user
      // in the case where priceUpper exists, (i.e. priceHTMLString is $25-$35 and priceUpper is 35)
      // swap price (= 25) with priceUpper, so the higher price is the one output to the user.
      // TODO also send and update lower price in database

      // If product is on sale, original price is of class "priceBlockStrikePriceString"
      // So, get that price, then swap it with price and "salePrice"
      var salePriceHTML = document.getElementsByClassName(
        "priceBlockStrikePriceString"
      )[0];
      if (salePriceHTML == null) {
        salePriceHTML = document.getElementsByClassName(
          "priceBlockStrikePriceString a-text-strike"
        )[0];
      }
      if (salePriceHTML) {
        var salePriceHTMLSplit = salePriceHTML.innerHTML.split("&nbsp;");
        var salePriceCurrency = salePriceHTMLSplit[0];
        var salePriceString = salePriceHTMLSplit[1].replace(",", ""); //if price = $1,349, get rid of comma
        var salePriceSplit = salePriceString.split("."); // split string by decimal point
        var salePriceFH = parseInt(salePriceSplit[0], 10); // FH = first half (i.e Integer part)
        var salePriceSH = parseInt(salePriceSplit[1], 10) / 100; // SH = second half (i.e. Decimal part)
        var salePrice = salePriceFH + salePriceSH;

        let saleTemp = salePrice;
        salePrice = price;
        price = saleTemp;
      }

      const imageURL = document.getElementById("landingImage").src;

      return salePriceHTML
        ? {
            title,
            currency,
            price,
            imageURL,
            salePrice,
            sale: true
          }
        : { title, currency, price, imageURL, sale: false };
    })
    .catch(err => {
      console.log(err);
    });

  console.log(item["sale"], item["salePrice"]);
  item["productId"] = productId;
  browser.close();
  return item;
};

const scrapeEbay = async url => {
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
      let imageURL;
      if (
        document.getElementsByClassName(
          "a-dynamic-image-a-stretch-horizontal"
        )[1]
      ) {
        imageURL = document
          .getElementsByClassName("a-dynamic-image-a-stretch-horizontal")[1]
          .getElementsByTagName("SRC")[1];
      }
      return listPrice
        ? { title, price, imageURL, listPrice, sale: true }
        : { title, price, imageURL, sale: false };
    });
  } catch (err) {
    return { error: "Scraping website failed" };
  }
  browser.close();
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
  testScraper
};
