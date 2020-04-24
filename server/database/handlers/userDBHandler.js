const models = require("../models");
const User = models.Users;

function formatUserReturnWithoutUserId(userList, userId) {
  var formattedList = [];
  for (i = 0; i < userList.length; i++) {
    if (userList[i].userId != userId) {
      var tempUserItem = {
        userId: userList[i].userId,
        userName: userList[i].userName,
        userEmail: userList[i].userEmail,
        userImageURL: userList[i].userImageURL,
        following: false
      };
      formattedList.push(tempUserItem);
    }
  }
  return formattedList;
}

/*
    createUser
    arguments: newUser - object ({userName, userPassword, userEmail})
    returns PROMISE for true/false
*/
function createUser(newUser) {
  console.log("Adding user to Database.");
  console.log(newUser);
  return (userCreatedBool = User.findOne({
    where: { userEmail: newUser.userEmail },
  })
    .then(function (foundUser) {
      if (foundUser == null) {
        let addedUser = User.create(newUser).catch(function (err) {
          console.log(err, newUser);
        });
        console.log("New User Added.");
        return addedUser;
      } else {
        console.log("User Already Exists.");
        return null;
      }
    })
    .catch(function (err) {
      console.log(err);
      return err;
    }));
}

/*
  getUser
  arguments: identifierType:("userName/userEmail/userId"), userIdentifier:(userName/userEmail/userId (respectively))
  returns: PROMISE for user

  POSSIBLE BUG: if userName structured like e-mail (e.g. userName = jonsnow@example.com, userEmail = js@example.com)
*/
function getUser(identifierType, userIdentifier) {
  console.log("Getting user from Database.");
  // if userIdentifier is userEmail
  if (identifierType == "userEmail") {
    return User.findOne({ where: { userEmail: userIdentifier } })
      .then(function (foundUser) {
        return foundUser;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  // if userIdentifier is userName
  else if (identifierType == "userName") {
    return User.findOne({ where: { userName: userIdentifier } })
      .then(function (foundUser) {
        return foundUser;
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (identifierType == "userId") {
    return User.findByPk(userIdentifier)
      .then(function (foundUser) {
        return foundUser;
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  console.log("Invalid identifierType.");
  return {};
}

/*
  updateUser
  arguments: userEmail, updateVariableType, updateVariable
  returns: PROMISE for true/false
*/
async function updateUser(updateUserEmail, updateVariableType, updateVariable) {
  console.log("Updating User in Database");
  var userToUpdate;
  User.findOne({ where: { userEmail: updateUserEmail } }).then(function (
    foundUser
  ) {
    userToUpdate = foundUser;
  });
}

async function getAllUsers(userId) {
  let allUsers = await User.findAll({
    attributes: ["userId", "userName", "userEmail", "userImageURL"],
  }).catch((err) => {
    console.log(err);
  });

  return formatUserReturnWithoutUserId(allUsers, userId);
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
};
