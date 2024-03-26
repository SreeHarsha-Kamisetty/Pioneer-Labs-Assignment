const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlackListModel } = require("../models/blacklisttoken.model");
require("dotenv").config();
const UserRouter = express.Router();

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


UserRouter.post("/login",async(req,res)=>{
    try {
        let {email,password} = req.body

        if(!(email && password)) return res.status(400).json({Error:"Unable to login. Please provide email and password"});

        let user = await UserModel.findOne({email:email});

        if(!user) return res.status(404).json({Error:"User not found. Please register"})

        let passwordMatch = await bcrypt.compare(password,user.password);

        if(!passwordMatch) return res.status(200).json({Message:"Invalid credentials"})

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
