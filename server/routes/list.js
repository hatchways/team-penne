const router = require("express").Router();
const listController = require("../controllers/list");

router.post("/create-list", listController.createList);
router.post("/update-list", listController.updateList);
router.get("/get-list", listController.getList);

module.exports = router;