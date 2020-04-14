require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const listRouter = require("./list");
const { authCheck } = require("./authCheck");
const { createUser, getUser, updateUser } = require("../database/handlers/userDBHandler");

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
  
  let userPromise = getUser("userEmail", userEmail);
  userPromise.then(function(user){
    if (!user || user.userEmail != userEmail) {
      console.log("Invalid email address.");
      return res.status(401).send({ message: "User created." });
    }
    try {
      bcrypt.compare(password, user.userPassword, function (err, result) {
        if (err || !result) {
          console.log("Incorrect Log In.");
          res.status(401);
          return res.send({
            error: "Invalid username or password",
          });
        } else {
          console.log("Correct Log In. Creating Cookie.");
          const token = jwt.sign(
            {
              data: {
                username: userEmail,
                userId: user.userID,
              },
            },
            secret,
            {
              expiresIn: 60 * 60, // would expire after 1 hour
            }
          );
          let options = {
            maxAge: 1000 * 60 * 60 * 1, // would expire after 1 hour
            httpOnly: true, // The cookie only accessible by the web server
          };
          res.clearCookie("jwt-auth-cookie");
          res.cookie("jwt-auth-cookie", token, options);
          return res.send("response from server");
        }
      });
    } catch (ex) {
      //logger.error(ex);
      console.error(ex);
      res.status(400);
      return res.send({ error: ex });
    }
  });
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  console.log("Creating User:");

  // username and password validation.
  if (userName.length < 6 || userPassword.length < 6) {
    res.status(401);
    return res.send({
      error: "Username and Password have to be at least 6 characters long.",
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
      error: "Invalid Email.",
    });
  }

  //For the no db test cases,
  //      userName = "Jon Snow", userPassword = "nothing", userEmail = "JonSnow@example.com"
  // DELETE NEXT LINES if not saving password as encrypted.
  try {
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
    //create model here for database
    //  use: userName, userEmail and userPassword
    const addUser = {userName: userName, userEmail: userEmail, userPassword: hashedPassword};
    createUser(addUser)
      .then(function(addedUserBool){
        if(addedUserBool){
          return res.status(200).send({ message: "User created." });
        }
        else{
          return res.status(400).send({ message: "User creation error." });
        }
      })
    
  } catch (ex) {
    console.error(ex);
    res.status(400);
    return res.send({ error: ex });
  }
});

// POST edit template to edit Username/Password/Email once authorized.
router.post("/edit", authCheck, function (req, res) {
  console.log("\nValid jwt-auth-cookie. Beginning /edit.");
  return res.send("Editing File");
});

router.post("/list", listRouter)

module.exports = router;