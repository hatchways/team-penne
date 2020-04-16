require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const authCheck = (req, res, next) => {
    if (req.cookies["jwt-auth-cookie"]) {
        const token = req.cookies["jwt-auth-cookie"];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log("\nInvalid jwt-auth cookie.")
                res.send(401);
            }
            else {
                console.log("Correct Token! UserId: ");
                console.log(decoded);
                next();
            }
        });
    }
    else {
        res.status(401).send({message: "Invalid JWT Auth Cookie."});
    }
  }

module.exports = { authCheck };