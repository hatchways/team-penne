require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { authCheck } = require("./authCheck");
const {
  createUser,
  getAllUsers,
  getUser
} = require("../database/handlers/userDBHandler");

const {
  getNotifications,
  getProductsForNotifications
} = require("../database/handlers/notificationDBHandler");

const saltRounds = 10;
router.use(cookieParser());

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
      //console.log("Correct Sign Up. Creating Cookie.");
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
  //console.log("Logout successful");
  res.clearCookie("jwt-auth-cookie");
  res.status(200).send({ message: "Logout successful" });
});

router.get("/userprofile", authCheck, async function(req, res) {
  let user = await getUser("userEmail", req.userData.userEmail);
  res.status(200).send({
    userName: req.userData.userName,
    userEmail: req.userData.userEmail,
    userImageUrl: user.userImageURL
  });
});

router.get("/get-notifications", authCheck, async (req, res) => {
  const userId = req.userData.userId;
  const notifications = await getProductsForNotifications(userId);
  console.log("Checking Notifications!");
  res.status(200).send({ notifications: notifications });
});

module.exports = router;
