const express = require("express");
const axios = require("axios");

const ApiDataRouter = express.Router();


/**
 * @swagger
 * /api/data:
 *  get:
 *      summary: List of public API available
 *      tags: [Data]
 *      parameters:
 *          - name: category
 *            in : query
 *            description: Filter data by category
 *            required: false
 *            type: string
 *          - name: page
 *            in: query
 *            description: Page number for pagination
 *            required: false
 *            type: integer
 *          - name: limit
 *            in: query
 *            description: Number of items per page
 *            required: false
 *            type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              count:
 *                                  type: integer
 *                                  description: number of entries returned
 *                              entries:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          API:
 *                                            type: string
 *                                            description: Name of the API
 *                                          Description:
 *                                             type: string
 *                                             description: Description of the API
 *                                          Auth:
 *                                              type: string
 *                                              description: Authentication method(if any)
 *                                          HTTPS:
 *                                              type: boolean
 *                                              description: Whether the API supports HTTPS
 *                                          Cors:
 *                                              type: string
 *                                              description: CORS Support status
 *                                          Link: 
 *                                              type: string
 *                                              description: Link to the API documentation
 *                                          Category:
 *                                              type: string
 *                                              description: Category of the API(eg.. Business)
 *                          
 *         
 *      
 *      
 * 
 */
ApiDataRouter.get("/data", async (req, res) => {
  try {
    let { category, limit, page } = req.query;

    let response = await axios("https://api.publicapis.org/entries");
    
    let data = response.data.entries;

    if(category){
        data = data.filter((item) => item.Category.toLowerCase() == category);
    }
    

    if (page || limit) {
      let start = page * limit;
      let end = start + limit;
      data = data.splice(start, limit);
    }
    let count = data.length;
    if (count === 0)
      return res
        .status(200)
        .json({
          Message:
            "No data available, please try another category or adjust page number and limit",
        });
    res.status(200).json({ count: count, entries: data });
  } catch (error) {
    console.log(error);
    res.status(error);
  }
});

module.exports = {
  ApiDataRouter,
};
