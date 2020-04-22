const scrapers = require("../scrapers");

const scrapeWebsite = async (req, res) => {
  const website = req.query.url.split(".")[1];

  let item;
  if (website === "amazon") {
    item = await scrapers.scrapeAmazon(req.query.url);
  } else if (website === "ebay") {
    item = await scrapers.scrapeEbay(req.query.url);
  } else {
    res.status(501).send({ error: "invalid url" });
  }
  if (item == -1) {
    res.status(501).send({ error: "puppeteer error" });
  } else {
    res.status(200).send(item);
  }
};

module.exports = { scrapeWebsite };
