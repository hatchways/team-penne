require("dotenv").config();
const express = require("express");
const router = express.Router();
const formData = require("express-form-data");
const cookieParser = require("cookie-parser");

router.use(formData.parse());
router.use(cookieParser());

const { authCheck } = require("./authCheck");
const {
  handleChangeOfFollow
} = require("../database/handlers/followersDBHandler");

router.post("/follow-user", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  const followeeUserId = req.body.userId;
  handleChangeOfFollow(currentUserId, followeeUserId, true);
});

router.post("/unfollow-user", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  const followeeUserId = req.body.userId;
  handleChangeOfFollow(currentUserId, followeeUserId, false);
});

router.get("/all-followed-users", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
});

module.exports = router;
