const router = require("express").Router();
const scraperController = require("../controllers/scraper");

router.get("/scrape", scraperController.scrapeWebsite);

module.exports = router;
