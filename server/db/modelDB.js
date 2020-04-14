var fakeDB = [];
var totalUsers = 0;

let itemLists = [];

function getItemLists() {
  return itemLists;
}

function addItemList(itemList) {
  itemLists.push(itemList);
}

function ifExists(userEmail) {
  for (user in fakeDB) {
    if (fakeDB[user].userEmail == userEmail) return true;
  }
  return false;
}

function addUserDB(addUserName, addUserPassword, addUserEmail) {
  if (ifExists(addUserEmail)) {
    return 0;
  }
  totalUsers += 1;
  var index = totalUsers;
  var toAddUser = {
    userID: index,
    userName: addUserName,
    userPassword: addUserPassword,
    userEmail: addUserEmail,
  };
  fakeDB.push(toAddUser);
  console.log("Successful addition of ", toAddUser);
  return 1;
}

function getUserDBEmail(getUserEmail) {
  for (user in fakeDB) {
    if (fakeDB[user].userEmail == getUserEmail) {
      console.log("FakeDBuser: ", fakeDB[user]);
      return fakeDB[user];
    }
  }
  console.log("User not found.\n ");
  return 0;
}

function getUserDBUsername(getUsername) {
  for (user in fakeDB) {
    if (fakeDB[user].userName == getUsername) {
      console.log("FakeDBuser: ", fakeDB[user]);
      return fakeDB[user];
    }
  }
  console.log("User not found.\n ");
  return 0;
}

module.exports = {
  addUserDB,
  getUserDBEmail,
  getUserDBUsername,
  getItemLists,
  addItemList,
};
