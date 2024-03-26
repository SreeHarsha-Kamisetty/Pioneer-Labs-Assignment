const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../models/blacklisttoken.model");
require("dotenv").config();


const auth = async(req,res,next)=>{

    try {
        let token = req.headers.authorization?.split(" ")[1];
        
        console.log(req.headers)
        if(!token) return res.status(401).json({Message:"Please login to continue"})

        let expiredToken = await BlackListModel.findOne({accessToken:token});

        if(expiredToken) return res.status(401).json({Message:"Invalid token"})

        let result = jwt.verify(token, process.env.SECRET_KEY);

        if(!result) return;
        next();
    } catch (error) {
        res.status(401).json({Message:"Unauthorized"})
    }

}

module.exports={
    auth
}