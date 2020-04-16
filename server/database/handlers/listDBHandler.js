const models = require("../models");
const { getUser } = require("./userDBHandler");
const { getAllProductsbyListId } = require("./productDBHandler");
const List = models.Lists;

function reformatListStyle(list) {
  var formattedList = [];
  for (i = 0; i < list.length; i++) {
    var tempListItem = {
      name: list[i].listName,
      image: list[i].listImageURL,
      amount: 0,
    };
    formattedList.push(tempListItem);
  }
  return formattedList;
}

/*
    checkListExists: check if list(with listName) exists for user(with userId)
    arguments: userId of current user, listName of list to be checked (if exists)
    return: true if exists, false if doesn't exist
*/
async function checkListExists(userId, listName) {
  const userBool = await getUser("userId", userId)
    .then(function (user) {
      return List.findOne({
        attributes: ["listId", "listName", "listImageURL", "userId"],
        where: { listName: listName, userId: user.userId },
      })
        .then((foundList) => {
          if (foundList == null) return false;
          else return true;
        })
        .catch((err) => {
          console.log(err);
          console.log("User has no lists.");
          return false;
        });
    })
    .catch((err) => {
      console.log(err);
      console.log("User Doesn't exist.");
    });
  return userBool;
}

/*
    getAllLists: get all lists for user(with userId)
    arguments: userId of current user
    return: return names of all lists
*/
async function getAllLists(getUserId) {
  const userAllLists = await List.findAll({
    attributes: ["listName", "listImageURL"],
    where: { userId: getUserId },
  })
    .then(function (res) {
      //console.log(res);
      return res;
    })
    .catch(function (err) {
      console.log(err);
      return [];
    });
  const formattedList = reformatListStyle(userAllLists);
  return formattedList;
}

/*
    getAllListsWithValues: get all the lists for user(with userID) with their products
    arguments: userId of current user
    return: return names and values of all lists
*/
async function getAllListsWithValues(userId) {
  return userId;
}

/*
    getList: get specific list(with listName) for user(with userId)
    arguments: userId of current user, listName of list to get
    return: return list with products
*/
async function getList(userId, listName) {
  const userList = await getUser("userId", userId).then(function (user) {
    return List.findOne({
      where: { listName: listName },
      include: [user],
    }).then(function (list) {
      if (list) return getAllProductsbyListId(list.listId);
    });
  });
  return userList;
}

/*
    addList: adds a list(with listName and listImage) for user(with userId)
    arguments: userId of current user, listName of list to add, listImage of image associated with list
    return: true if successful, false if unsuccessful
*/
async function addList(userId, listName, listImage) {
  let addListBool = await getUser("userId", userId)
    .then(async function (user) {
      var listExistsBool = await checkListExists(user.userId, listName);
      console.log("listExistsAlready: " + listExistsBool);
      if (listExistsBool) return false;
      else {
        if (listImage != null) {
          return List.create({
            listName: listName,
            listImageURL: listImage,
            userId: user.userId,
          })
            .then(function (res) {
              console.log(
                "Creating New List for User " + userId + " named " + listName
              );
              //console.log(res);
              return res;
            })
            .catch(function (err) {
              console.log(err);
              return null;
            });
        } else {
          // Add implementation for default image here
          return await List.create({ listName: listName, userId: user.userId })
            .then(function (res) {
              return res;
            })
            .catch(function (err) {
              console.log(err);
              return null;
            });
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  return addListBool != null;
}

module.exports = {
  checkListExists,
  getAllLists,
  getList,
  addList,
  getAllListsWithValues,
};
