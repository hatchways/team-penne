const models = require('../models');
const { getUser } = require('./userDBHandler');
const { getAllProductsbyListId } = require('./productDBHandler');
const List = models.Lists;

/*
    checkListExists: check if list(with listName) exists for user(with userId)
    arguments: userId of current user, listName of list to be checked (if exists)
    return: true if exists, false if doesn't exist
*/
async function checkListExists(userId, listName){
    const userBool = await getUser("userId", userId)
        .then(function(user){
            return List.findOne({ where: { listName: listName }, include: [user]})
        })
        .then(function(list){
            if(list!=null) return true;
            else return false;
        });
    return userBool;
}

/*
    getAllLists: get all lists for user(with userId)
    arguments: userId of current user
    return: return names of all lists
*/
async function getAllLists(userId){
    const userAllLists = await List.findAll({ where: {userId: userId}})
    return userAllLists;
}

/*
    getAllListsWithValues: get all the lists for user(with userID) with their products
    arguments: userId of current user
    return: return names and values of all lists
*/
async function getAllListsWithValues(userId){
    return userId;
}

/*
    getList: get specific list(with listName) for user(with userId)
    arguments: userId of current user, listName of list to get
    return: return list with products
*/
async function getList(userId, listName){
    const userList = await getUser("userId", userId)
        .then(function(user){
            return List.findOne({ where: { listName: listName }, include: [user]})
                .then(function(list){
                    if(list) return getAllProductsbyListId(list.listId);
                })
        })
    return userList;
}

/*
    addList: adds a list(with listName and listImage) for user(with userId)
    arguments: userId of current user, listName of list to add, listImage of image associated with list
    return: true if successful, false if unsuccessful
*/
async function addList(userId, listName, listImage){
    const addListBool = await getUser("userId", userId)
        .then(function(user){
            if(checkListExists(user.userId, listName)) return false;
            else{
                if(listImage != null){
                    return await List.create({listName: listName, listImageURL: listImage, userId: user.userId})
                }
                else{
                    // Add implementation for default image here
                    return await List.create({listName: listName, userId: user.userId})
                }
            }
        });
    return addListBool;
}

module.exports = {
    checkListExists, 
    getAllLists, 
    getList, 
    addList, 
    getAllListsWithValues 
};