const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
//const models = require('../database/models');
const jwt = require('jsonwebtoken');
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const saltRounds=10;
router.use(cookieParser());

router.post('/login', async (req, res) => {
    const secret = process.env.JWT_SECRET;
    const userName = req.body.userName;
    const password = req.body.userPassword;
    console.log("Log in being attempted.")

    //add email (text) check and password (length) check
    //no username or password provided
    if (!userName || !password) {
        return res.send({
            error: 'User name and password required.'
        })
    }
    
    // NO DATABASE TEST CASE
    // userPassword is "nothing" after it's been bcrypted.
    var userJon = {
        userID:1,
        userName:"Jon Snow", 
        userPassword:"$2y$10$M7v.6lgTeEqISeah0fOsFub.K14sN/0eGwPn0gbrC9WF6c.onJ.4a",
        userEmail:"JonSnow@example.com"
    };
    var userArray = new Array();
    userArray.push(userJon);

    const user = userArray[0];
    if (!user) {
        res.status(401);
        return res.send({
            error: 'Invalid username or password'
        });
    }

    try{
        await bcrypt.compare(password, user.userPassword, function(err, res){
            if (err) {
                res.status(401);
                return res.send({
                    error: 'Invalid username or password'
                });
            }
            else {
                const token = jwt.sign(
                    {data: {
                        username: userName,
                        userId: user.userID
                        }},
                    secret,
                    { 
                        expiresIn: 60 * 60 
                    }
                );
                console.log("hello world!")
                let options = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    //httpOnly: true, // The cookie only accessible by the web server
                    //signed: true // Indicates if the cookie should be signed
                };
                res.cookie("cookieName", token, options)
                return res.send("response from server");
            }
        });
    }
    catch (ex) {
        //logger.error(ex);
        console.error(ex);
        res.status(400);
        return res.send({ error: ex });
    }
});

router.post('/signup', async (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    console.log("username:"+req.body.userName+" email:"+req.body.email+" password"+req.body.password);

    //For the no db test cases, 
    //      userName = "Jon Snow", userPassword = "nothing", userEmail = "JonSnow@example.com"

    try {
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds)
        console.log("hPassword:" + hashedPassword)
        //create model here for database
        //  use: userName, userEmail and userPassword
        return res.send({ message: 'User created' });
    }
    catch (ex) {
        //logger.error(ex);
        console.error(ex);
        res.status(400);
        return res.send({ error: ex });
    }
});

module.exports = router;