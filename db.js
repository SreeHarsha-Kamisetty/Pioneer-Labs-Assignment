const mongoose = require("mongoose")
require("dotenv").config()


const DBConnection = mongoose.connect(process.env.mongo_URL)


module.exports={
    DBConnection
}