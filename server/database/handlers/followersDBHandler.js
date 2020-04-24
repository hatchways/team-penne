const models = require("../models");
const User = models.Users;
const Followers = models.Followers;

async function getFollowerRow(currentUserId, followeeUserId) {
  return await Followers.findOne({
    attributes: ["userIdFollower", "userIdFollowee"],
    where: { userIdFollower: currentUserId, userIdFollowee: followeeUserId }
  })
    .then(res => {
      //already following!
      return res;
    })
    .catch(err => {
      console.log(err);
    });
}

// currentUser (with currentUserId) follows/following followeeUserId
// startFollowingBool = true, if currentUser wants to follow
// startFollowingBool = false, if currentUser wants to stop following
async function handleChangeOfFollow(
  currentUserId,
  followeeUserId,
  startFollowingBool
) {
  let followingRow = await getFollowerRow(currentUserId, followeeUserId);
  if (startFollowingBool) {
    if (followingRow != null) return { message: "Already following." };
    else {
      // create a new entry in Followers table
      return await Followers.create({
        userIdFollower: currentUserId,
        userIdFollowee: followeeUserId
      }).catch(err => console.log(err));
    }
  }
  //startFollowingBool = false, i.e. function was called to remove relationship
  else {
    // delete found entry
    if (followingRow == null) return { message: "No such relationship exists" };
    else {
      // delete the entry from followers table
      return await followingRow.destroy().catch(err => console.log(err));
    }
  }
}

module.exports = {
  handleChangeOfFollow
};
