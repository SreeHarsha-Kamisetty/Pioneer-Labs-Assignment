const express = require("express")
const {auth} = require("../middlewares/auth.middleware")
const ProtectedRoute  = express.Router();

ProtectedRoute.use(auth);
ProtectedRoute.get("/",(req,res)=>{
    res.status(200).json({Message:"User authenticated"})
})

module.exports={
    ProtectedRoute
}