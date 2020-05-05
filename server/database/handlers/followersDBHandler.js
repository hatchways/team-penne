const models = require("../models");
const User = models.Users;
const Followers = models.Followers;

async function formatUsersWithFollowing(userId, userList) {
  let formattedUserList = [];
  for (i = 0; i < userList.length; i++) {
    let foundUser = await Followers.findOne({
      attributes: ["userIdFollower", "userIdFollowee"],
      where: { userIdFollower: userId, userIdFollowee: userList[i].userId }
    }).catch(err => {
      console.log(err);
    });
    // if we found the user in the followers table, then set following to true
    if (foundUser == null) {
      formattedUserList.push(userList[i]);
    }
  }
  return formattedUserList;
}

// followersList[i].userIdFollower/.userIdFollowee
// > where userIdFollower is the current user
async function formattedFollowing(followersList) {
  let i;
  let formattedList = [];
  for (i = 0; i < followersList.length; i++) {
    let foundUser = await User.findOne({
      attributes: ["userId", "userName", "userEmail", "userImageURL"],
      where: { userId: followersList[i].userIdFollowee }
    })
      .then(res => {
        let tempUser = {
          userId: res.userId,
          userName: res.userName,
          userImageURL: res.userImageURL,
          following: true
        };
        return tempUser;
      })
      .catch(err => {
        console.log(err);
        return {};
      });
    formattedList.push(foundUser);
  }
  return formattedList;
}

// followersList[i].userIdFollower/.userIdFollowee
// > where userIdFollowee is the current user
async function formattedFollowers(followersList) {
  let i;
  let formattedList = [];
  for (i = 0; i < followersList.length; i++) {
    // check to see if the current user is following back already
    let checkIfFollowedBackBool = await Followers.findOne({
      attributes: ["userIdFollower", "userIdFollowee"],
      where: {
        userIdFollowee: followersList[i].userIdFollower,
        userIdFollower: followersList[i].userIdFollowee
      }
    })
      .then(res => {
        if (res != null) return true;
        else return false;
      })
      .catch(err => {
        console.log(err);
      });

    let foundUser = await User.findOne({
      attributes: ["userId", "userName", "userEmail", "userImageURL"],
      where: { userId: followersList[i].userIdFollower }
    })
      .then(res => {
        let tempUser = {
          userId: res.userId,
          userName: res.userName,
          userImageURL: res.userImageURL,
          following: checkIfFollowedBackBool
        };
        return tempUser;
      })
      .catch(err => {
        console.log(err);
        return {};
      });
    formattedList.push(foundUser);
  }
  return formattedList;
}

async function getFollowerRow(currentUserId, followeeUserId) {
  return await Followers.findOne({
    attributes: ["id", "userIdFollower", "userIdFollowee"],
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
  let followingRow = await getFollowerRow(currentUserId, followeeUserId).catch(
    err => {
      console.log(err);
    }
  );
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

async function getAllFollowingUsers(userId) {
  let allFollowers = await Followers.findAll({
    attributes: ["userIdFollower", "userIdFollowee"],
    where: { userIdFollower: userId }
  })
    .then(res => {
      //console.log(res);
      return res;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
  let reformattedFollowers = await formattedFollowing(allFollowers).catch(
    err => {
      console.log(err);
    }
  );
  return reformattedFollowers;
}

async function getAllFollowerUsers(userId) {
  let allFollowers = await Followers.findAll({
    attributes: ["userIdFollower", "userIdFollowee"],
    where: { userIdFollowee: userId }
  })
    .then(res => {
      //console.log(res);
      return res;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
  let reformattedFollowers = await formattedFollowers(allFollowers).catch(
    err => {
      console.log(err);
    }
  );
  return reformattedFollowers;
}

module.exports = {
  formatUsersWithFollowing,
  getAllFollowingUsers,
  getAllFollowerUsers,
  handleChangeOfFollow
};
