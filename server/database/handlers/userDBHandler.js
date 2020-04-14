const models = require('../models');
const User = models.User;

/*
    createUser
    arguments: newUser - object ({userName, userPassword, userEmail})
    returns PROMISE for true/false
*/
function createUser(newUser){
    console.log("Adding user to Database.");
    console.log(newUser);
    return User.findOne({where: {userEmail: newUser.userEmail}})
    .then(function(foundUser){
      if(!foundUser){
        User.create(newUser);
        console.log("New User Added.");
        return true;
      }
      else{
        console.log("User Already Exists.");
        return false;
      }
    })
  };

/*
  getUser
  arguments: identifierType:("userName/userEmail/userId"), userIdentifier:(userName/userEmail/userId (respectively))
  returns: PROMISE for user

  POSSIBLE BUG: if userName structured like e-mail (e.g. userName = jonsnow@example.com, userEmail = js@example.com)
*/
function getUser(identifierType, userIdentifier){
    console.log("Getting user from Database.");
    // if userIdentifier is userEmail
    if(identifierType=="userEmail"){
        return User.findOne({where: {userEmail: userIdentifier}})
        .then(function(foundUser){
            return foundUser;
        });
    }
    // if userIdentifier is userName
    else if(identifierType=="userName"){
        return User.findOne({where: {userName: userIdentifier}})
        .then(function(foundUser){
            return foundUser;
        });
    }
    else if(identifierType=="userId"){
      return User.findOne({where: {userId: userIdentifier}})
      .then(function(foundUser){
          return foundUser;
      });
  }
    else{
        return {};
    }
  };

/*
  updateUser
  arguments: userEmail, updateVariableType, updateVariable
  returns: PROMISE for true/false
*/
async function updateUser(updateUserEmail, updateVariableType, updateVariable){
    console.log("Updating User in Database");
    var userToUpdate;
    User.findOne({where: {userEmail: updateUserEmail}})
    .then(function(foundUser){
        userToUpdate = foundUser;
    });
};

module.exports = { 
  createUser, 
  getUser, 
  updateUser 
};