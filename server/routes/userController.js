require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
//const models = require('../database/models');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { authCheck } = require("./authCheck");
const { addUserDB, getUserDBEmail } = require("../db/modelDB");

const saltRounds = 10;
router.use(cookieParser());

router.post("/login", async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const userEmail = req.body.userEmail;
  const password = req.body.userPassword;
  console.log("\nLog in being attempted.");

  //no username or password provided
  if (!userEmail || !password) {
    console.log("User email and password required.");
    return res.status(401).send();
  }

  // NO DATABASE TEST CASE
  // userPassword is "nothing" after it's been bcrypted.
  var userJon = {
    userID: 1,
    userName: "Jon Snow",
    userPassword: "nothing",
    userEmail: "JonSnow@example.com"
  };
  var userArray = new Array();
  userArray.push(userJon);
  // END OF NO DATABASE TEST CASE. Replace everything in between with DB handling.

  const user = getUserDBEmail(userEmail);

  if (!user || user.userEmail != userEmail) {
    console.log("Invalid email address.");
    return res.status(401).send();
  }

  bcrypt.hash(user.userPassword, saltRounds, function(err, hash) {
    if (err) {
      throw err;
    }
    bcrypt.compare(password, hash, function(err, result) {
      if (err) {
        throw err;
      } else if (!result) {
        console.log("Incorrect password.");
        return res.status(401).send();
      } else {
        console.log("Correct log in, creating Cookie.");
        const token = jwt.sign(
          {
            data: {
              userEmail: userEmail,
              userId: user.userID
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
        return res.status(200).send("response from server");
      }
    });
  });
});

router.post("/signup", async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  console.log("Creating User:");

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

  // addUserDB adds the user with userName, userPassword, userEmail to the fakeDB.
  // return 0 or 1 for results.
  if (!addUserDB(userName, userPassword, userEmail)) {
    console.log("User already exists.");
    return res.status(400).send({ error: "User already exists." });
  } else {
    const user = getUserDBEmail(userEmail);
    const token = jwt.sign(
      {
        data: {
          userEmail: user.userEmail,
          userId: user.userID
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
    console.log("User created");
    return res.status(200).send({ message: "User created." });
  }

  //For the no db test cases,
  //      userName = "Jon Snow", userPassword = "nothing", userEmail = "JonSnow@example.com"
  // DELETE NEXT LINES if not saving password as encrypted.
  try {
    //create model here for database
    //  use: userName, userEmail and userPassword

    return res.status(200).send({ message: "User created" });
  } catch (ex) {
    //logger.error(ex);
    console.error(ex);
    res.status(400);
    return res.send({ error: ex });
  }
  // DELETE UNTIL HERE.
});

router.get("/logout", async (req, res) => {
  console.log("Logout successful");
  res.clearCookie("jwt-auth-cookie");
  res.status(200).send({ message: "Logout successful" });
});

// POST edit template to edit Username/Password/Email once authorized.
router.post("/edit", authCheck, function(req, res) {
  console.log("\nValid jwt-auth-cookie. Beginning /edit.");
  return res.send("Editing File");
});

module.exports = router;
