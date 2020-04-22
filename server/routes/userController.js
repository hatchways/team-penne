require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { authCheck } = require("./authCheck");
const { createUser, getUser } = require("../database/handlers/userDBHandler");
const {
  addList,
  getAllListsWithValues,
  getListIdByListName
} = require("../database/handlers/listDBHandler");
const {
  getAllProductsbyListId,
  addProductToList,
} = require("../database/handlers/productDBHandler");

const {
  getNotifications,
} = require("../database/handlers/notificationDBHandler");

const saltRounds = 10;
router.use(cookieParser());

router.get("/getNotifications", authCheck, async (req, res) => {
  const userId = req.userData.userId;
  const notifications = await getNotifications(userId);
  console.log(notifications);
  res.status(200).send({ notifications: notifications });
});

router.post("/login", async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const userEmail = req.body.userEmail;
  const password = req.body.userPassword;

  //no username or password provided
  if (!userEmail || !password) {
    return res.status(401).send();
  }

  let user = await getUser("userEmail", userEmail);
  if (!user || user.userEmail != userEmail) {
    return res.status(401).send({ message: "Invalid User." });
  }
  try {
    bcrypt.compare(password, user.userPassword, function(err, result) {
      if (err || !result) {
        res.status(401);
        return res.send({
          error: "Invalid username or password"
        });
      } else {
        const token = jwt.sign(
          {
            data: {
              userName: user.userName,
              userEmail: userEmail,
              userId: user.userId
            }
          },
          secret,
          {
            expiresIn: 60 * 60 // would expire after 1 hour
          }
        );
        let options = {
          maxAge: 1000 * 60 * 60 * 1, // would expire after 1 hour
          httpOnly: true // The cookie only accessible by the web server
        };
        res.clearCookie("jwt-auth-cookie");
        res.cookie("jwt-auth-cookie", token, options);
        return res.send("response from server");
      }
    });
  } catch (ex) {
    console.error(ex);
    res.status(400);
    return res.send({ error: ex });
  }
});

router.post("/signup", async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  // username and password validation.
  if (userName.length < 6 || userPassword.length < 6) {
    res.status(401);
    return res.send({
      error: "Username and Password have to be at least 6 characters long."
    });
  }

  // email validation
  var userEmail_split = userEmail.split("@");
  if (
    userEmail_split[0] == "" || // empty string before @ sign
    userEmail_split[1] == null || // no @ sign
    userEmail_split[1].split(".")[0] == "" || // no email domain
    userEmail_split[1].split(".")[1] == null || // no . at the end for (e.g.)".com"
    userEmail_split[1].split(".")[1] == ""
  ) {
    // nothing after the . (e.g. no "com" or "ca")
    res.status(401);
    return res.send({
      error: "Invalid Email."
    });
  }

  //For the no db test cases,
  //      userName = "Jon Snow", userPassword = "nothing", userEmail = "JonSnow@example.com"
  // DELETE NEXT LINES if not saving password as encrypted.
  try {
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
    //create model here for database
    //  use: userName, userEmail and userPassword
    const addUser = {
      userName: userName,
      userEmail: userEmail,
      userPassword: hashedPassword
    };
    const addedUser = await createUser(addUser);
    //console.log(addedUser);
    if (addedUser != null) {
      console.log("Correct Sign Up. Creating Cookie.");
      const token = jwt.sign(
        {
          data: {
            userName: userName,
            userEmail: userEmail,
            userId: addedUser.userId
          }
        },
        secret,
        { expiresIn: 60 * 60 } // would expire after 1 hour
      );
      let options = {
        maxAge: 1000 * 60 * 60 * 1, // would expire after 1 hour
        httpOnly: true // The cookie only accessible by the web server
      };
      res.clearCookie("jwt-auth-cookie");
      res.cookie("jwt-auth-cookie", token, options);
      return res.status(200).send({ message: "User created." });
    } else {
      return res
        .status(400)
        .send({ message: "User creation error. User already exists." });
    }
  } catch (ex) {
    console.error(ex);
    res.status(400);
    return res.send({ error: ex });
  }
});

router.get("/logout", async (req, res) => {
  console.log("Logout successful");
  res.clearCookie("jwt-auth-cookie");
  res.status(200).send({ message: "Logout successful" });
});

// POST edit template to edit Username/Password/Email once authorized.
router.post("/edit", authCheck, function(req, res) {
  return res.send("Editing File");
});

router.get("/userprofile", authCheck, async function(req, res) {
  let user = await getUser("userEmail", req.userData.userEmail);
  res.status(200).send({
    userName: req.userData.userName,
    userEmail: req.userData.userEmail,
    userImageUrl: user.userImageURL
  });
});

// create a new list, and assign it to user userId, with name and picture in req.body
router.post("/itemLists/addLists", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  addList(currentUserId, req.body.listName, req.body.listPicture)
    .then(function(ret) {
      res.status(200).send({ message: "Added List." });
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({ err });
    });
});

// GET - retrieve all Lists for current user
router.get("/itemLists/getLists", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  let allLists = await getAllListsWithValues(currentUserId)
    .then(function(allLists) {
      return allLists;
    })
    .catch(function(err) {
      console.log(err);
    });
  // Output "Test" for testing value of allLists coming out of "getAllListsWithValues"
  //console.log(allLists[0].products);
  return res.status(200).send({ itemLists: allLists });
});

// GET - retrieve all Lists for current user
router.get("/itemLists/getProductList", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  const listName = req.query.listName;

  const currentList = await getListIdByListName(currentUserId, listName);
  const currentListProducts = await getAllProductsbyListId(currentList.listId);
  return res.status(200).send({ productList: currentListProducts });
});

//add a product defined in req.body to list: listName (req.body.listName)
router.post("/itemLists/addItems", authCheck, async (req, res) => {
  const currentUserId = req.userData.userId;
  var itemAddedBool = await addProductToList(
    req.body.productId,
    req.body.productName,
    req.body.productURL,
    req.body.productImageURL,
    req.body.productCurrency,
    req.body.productPrice,
    req.body.productSalePrice,
    currentUserId,
    req.body.listName
  );
  return res.status(200).send({ message: "Item Added." });
});

module.exports = router;
