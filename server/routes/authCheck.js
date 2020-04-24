require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function authJWTCheck(cookies) {
  if (cookies["jwt-auth-cookie"]) {
    const token = cookies["jwt-auth-cookie"];
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return { message: "Decoding failed." };
      } else {
        // on correct authCheck, send user identification data to pages
        return decoded.data;
      }
    });
  } else {
    return { message: "Invalid JWT Auth Cookie." };
  }
}

const authCheck = (req, res, next) => {
  if (req.cookies["jwt-auth-cookie"]) {
    const token = req.cookies["jwt-auth-cookie"];
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("\nInvalid jwt-auth cookie.");
        res.send(401);
      } else {
        // on correct authCheck, send user identification data to pages
        req.userData = decoded.data;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Invalid JWT Auth Cookie." });
  }
};

module.exports = { authCheck, authJWTCheck };
