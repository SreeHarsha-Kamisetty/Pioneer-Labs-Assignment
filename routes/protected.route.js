const express = require("express")
const {auth} = require("../middlewares/auth.middleware")
const ProtectedRoute  = express.Router();

ProtectedRoute.use(auth);


/**
 * @swagger
 * /protected/:
 *  get:
 *      summary: Access protected route
 *      tags: [Protected]
 *      security:
 *          - BearerAuth: []
 *      responses:
 *          200:
 *              description: User authenticated successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: User authenticated
 *                                  default: User authenticated
 * 
 *          401:
 *              description: Unauthorized or invalid token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Message:
 *                                  type: string
 *                                  description: Unauthorized or invalid token
 *                                  default: Unauthorized or invalid token
 * 
 */
ProtectedRoute.get("/",(req,res)=>{
    res.status(200).json({Message:"User authenticated"})
})

module.exports={
    ProtectedRoute
}