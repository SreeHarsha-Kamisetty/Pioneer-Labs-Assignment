const express = require("express");
const cors = require("cors");
const { DBConnection } = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 8080;




const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home")
})


app.listen(PORT,async()=>{

    try {
        await DBConnection;
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }   
    
})