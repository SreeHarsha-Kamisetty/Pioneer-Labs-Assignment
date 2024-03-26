const express = require("express")
const axios = require("axios");



const ApiDataRouter = express.Router();

ApiDataRouter.get("/data",async(req,res)=>{
    try {
        // console.log(Object.keys(req.query))
        // let validQuery = ['category','page','limit'];
        // let query = Object.keys(req.query);
        
        let {category,limit,page} = req.query;

        let response = await axios("https://api.publicapis.org/entries");
        let data = response.data.entries;
        // console.log(data)
        data = data.filter(item => item.Category.toLowerCase() == category)
        
        if(page || limit){
            let start = (page)*(limit);
            let end = start+(limit);
            data = data.splice(start,limit);
        }
        let count = data.length
        
        if(count === 0) return res.status(200).json({Message:"No data available, please try another category or adjust page number and limit"})
        res.status(200).json({count:count,entries:data});
    } catch (error) {
        console.log(error)
        res.status(error)
    }
})



module.exports={
    ApiDataRouter
}