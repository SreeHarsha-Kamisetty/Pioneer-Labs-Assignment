const express = require("express");
const cors = require("cors");
const { DBConnection } = require("./db");
const { UserRouter } = require("./routes/user.routes");
const { ApiDataRouter } = require("./routes/apidata.routes");
const { ProtectedRoute } = require("./routes/protected.route");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");


const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title: "Public Api List",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
              BearerAuth: {
                type: "http",
                scheme: "bearer",
              },
            },
          },
    },
    
    apis:["./routes/*.js"],
}
const openAPISpecification = swaggerJsdoc(options);

const app = express();
app.use(cors());
app.use(express.json());


app.use("/users",UserRouter)
app.use("/api",ApiDataRouter)
app.use("/protected",ProtectedRoute);

app.use("/",swaggerUI.serve,swaggerUI.setup(openAPISpecification));
// app.get("/",(req,res)=>{
//     res.send("Home")
// })


app.listen(PORT,async()=>{

    try {
        await DBConnection;
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }   
    
})