const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlackListModel } = require("../models/blacklisttoken.model");
require("dotenv").config();
const UserRouter = express.Router();



/**
 * @swagger
 * /users/register:
 *  post:
 *      summary: Register user with name, email and password
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: Name of the user
 *                      email:
 *                          type: string
 *                          description: Email of the user
 *                      password:
 *                          type: string
 *                          description: Password
 *      responses:
 *          200:
 *              description: User succesfully registered
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: New user has been created
 *                                  default: New user has been created
 *                                    
 *          403:
 *              description: Unable to create a new account as an account has been created using the provided email
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: Unable to create a new account as an account has been created using the provided email
 *                                  default: Account already exists, please login
 *          500: 
 *              description: Internal server error during registration
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: Server error
 *                                  default: Error during registration
 * 
 *          400:
 *             description: Error if any of the required parameters such as name,email and password are missing
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             Message:
 *                                 type: string
 *                                 description: Error
 *                                 default: Unable to register. Please provide email,password and name
 */
UserRouter.post("/register", async (req, res) => {
  try {
    let { email, password,name } = req.body;
    if(!(email && password && name)) return res.status(400).json({Error:"Unable to register. Please provide email,password and name"});

    let user = await UserModel.findOne({ email: email });

    if (user) return res.status(403).json({ Message: "Account already exists. Please login" });

    let hashedPassword = await bcrypt.hash(password,7);

    req.body.password = hashedPassword;

    let newUser = new UserModel(req.body);
    await newUser.save();

    res.status(200).json({Message:"New user has been created"});


  } catch (error) {
    res.status(500).json({Error:"Error while registering"})

  }
});

/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: Login with registered email and password
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: Email of the user
 *                      password:
 *                          type: string
 *                          description: Password
 *      responses:
 *          200:
 *              description: Login successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: Success message
 *                                  default: Login successful
 *                              accessToken:
 *                                  type: string
 *                                  description: JWT token generated
 *                                  default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlNyZWUgSGFyc2hhIiwidXNlcklkIjoiNjYwMjllMTVkYWFjMWFhZDI0YzA5NGQ0IiwiaWF0IjoxNzExNDUxODE0fQ.P9S2vTMHxAicjvBn_Wos5n0fDuLmhkGAA54WMgTnzEo
 *                                    
 *          404:
 *              description: Unable to login as user account does not exists
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: Unable to login
 *                                  default: User not found. Please register
 *          500: 
 *              description: Internal server error during login
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: Server error
 *                                  default: Error during login
 * 
 *          400:
 *             description: Error if any of the required parameters such as email and password are missing
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             Message:
 *                                 type: string
 *                                 description: Error
 *                                 default: Unable to login. Please provide email,password 
 */
UserRouter.post("/login",async(req,res)=>{
    try {
        let {email,password} = req.body

        if(!(email && password)) return res.status(400).json({Error:"Unable to login. Please provide email and password"});

        let user = await UserModel.findOne({email:email});

        if(!user) return res.status(404).json({Error:"User not found. Please register"})

        let passwordMatch = await bcrypt.compare(password,user.password);

        if(!passwordMatch) return res.status(401).json({Message:"Invalid credentials"})

        let payload = {
            userName: user.name,
            userId :user._id
        }
        let jwtSign = process.env.SECRET_KEY

        let accessToken = jwt.sign(payload, jwtSign);

        res.status(200).json({Message:"Login successful",accessToken});

    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error during login"})
    }
})


/**
 * @swagger
 * /users/logout:
 *  get:
 *      summary: Logout
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Logout successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: Success message
 *                                  default: Successfully logged out!
 *          500: 
 *              description: Internal server error during logout
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: Server error
 *                                  default: Error during logout
 *      parameters:
 *          - name: Authorization
 *            in: header
 *            description: Access token
 *            required: true
 *            type: string
 * 
 */

                        

UserRouter.get("/logout",async(req,res)=>{

    try {
        let token = req.headers.authorization.split(" ")[1];

        let blacklistToken = new BlackListModel({accessToken:token})
    
        await blacklistToken.save();
    
        res.status(200).json({Message:"Successfully logged out!"});
    
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error during logout"});
    }

    
})
module.exports = {
  UserRouter,
};
