require("dotenv").config();
const express = require("express");
const router = express.Router();
const formData = require("express-form-data");
const cookieParser = require("cookie-parser");

router.use(formData.parse());
router.use(cookieParser());

const { authCheck } = require("./authCheck");
const {
  handleChangeOfFollow,
  getAllFollowerUsers,
  getAllFollowingUsers,
  formatUsersWithFollowing
} = require("../database/handlers/followersDBHandler");
const {
  createUser,
  getAllUsers,
  getUser
} = require("../database/handlers/userDBHandler");

router.post("/set-follow-user", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  const followeeUserId = req.body.userId;
  const following = req.body.following; //if following = true, follow. Else, unfollow.

  handleChangeOfFollow(currentUserId, followeeUserId, following);
  res
    .status(200)
    .send({ message: `${currentUserId} followed ${followeeUserId}` });
});

/*
router.post("/unfollow-user", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  const followeeUserId = req.body.userId;
  handleChangeOfFollow(currentUserId, followeeUserId, false);
  res
    .status(200)
    .send({ message: `${currentUserId} unfollowed ${followeeUserId}` });
});
*/

router.get("/get-following-users", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  let allFollowed = await getAllFollowingUsers(currentUserId);
  res.status(200).send({ followingList: allFollowed });
});

router.get("/get-follower-users", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  let allFollowing = await getAllFollowerUsers(currentUserId);
  res.status(200).send({ followingList: allFollowing });
});

// so far, only used in get suggestions
router.get("/get-all-suggestions", authCheck, async function(req, res) {
  let userId = req.userData.userId;
  let allUsers = await getAllUsers(userId);
  //console.log(allUsers);
  let allFormattedUsers = await formatUsersWithFollowing(userId, allUsers);
  res.status(200).send({ usersList: allFormattedUsers });
});

module.exports = router;
