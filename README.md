# Backend Assigment

This assignment consists of various tasks 
- Task1: Implement User Authentication with JWT
- Task 2: Create API Endpoints for Data Retrieval
- Task 3: Implement Swagger Documentation
- Task 4: Secure API Endpoint for Authenticated Users Only

## Technologies used:
- Nodejs
- Expressjs
- MongoDB

### NPM Packages used:
- axios
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- nodemon
- mongoose
- swagger-jsdoc
- swagger-ui-express


## Deployed links

- Backend: https://pioneer-labs-assignment.onrender.com

### Task1: Implement User Authentication with JWT

#### API Endpoints:

- /users/register
  - Used to register user with name,email and password
  - Method: POST
  - Request Body:
```json
  {
    "name":"Sree Harsha",
    "email":"sreeharsha.kamisetty99@gmail.com",
    "password":"harsha1234"
}
```
  - Response:
```json
{
    "Message": "New user has been created"
}
```
- /users/login
   - Used to login with registered email and password
   - Method: POST
   - Request Body:
```json
{
    
    "email":"sreeharsha.kamisetty99@gmail.com",
    "password":"harsha1234"
}
```
   - Response:
```json
{
    "Message": "Login successful",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlNyZWUgSGFyc2hhIiwidXNlcklkIjoiNjYwMjllMTVkYWFjMWFhZDI0YzA5NGQ0IiwiaWF0IjoxNzExNDU5MTQ3fQ.-rid8WQgPN4819UuFYKxN9_hxno7MTbEYBUErOeozYc"
}
```
- /users/logout
  - Used to logout user
  - Method: GET
  - Response:
```json
{
    "Message": "Successfully logged out!"
}
```

### Task2  Create API Endpoints for Data Retrieval

- API Endpoint:
- /api/data
- Method: GET
- Used to retrieve data about api
- Able to filter data using category=CategoryName in request query
- Able to paginate using page and limit
- Example : /api/data?category=anime&page=3&limit=5
- Response:
```json
{
    "count": 4,
    "entries": [
        {
            "API": "Studio Ghibli",
            "Description": "Resources from Studio Ghibli films",
            "Auth": "",
            "HTTPS": true,
            "Cors": "yes",
            "Link": "https://ghibliapi.herokuapp.com",
            "Category": "Anime"
        },
        {
            "API": "Trace Moe",
            "Description": "A useful tool to get the exact scene of an anime from a screenshot",
            "Auth": "",
            "HTTPS": true,
            "Cors": "no",
            "Link": "https://soruly.github.io/trace.moe-api/#/",
            "Category": "Anime"
        },
        {
            "API": "Waifu.im",
            "Description": "Get waifu pictures from an archive of over 4000 images and multiple tags",
            "Auth": "",
            "HTTPS": true,
            "Cors": "yes",
            "Link": "https://waifu.im/docs",
            "Category": "Anime"
        },
        {
            "API": "Waifu.pics",
            "Description": "Image sharing platform for anime images",
            "Auth": "",
            "HTTPS": true,
            "Cors": "no",
            "Link": "https://waifu.pics/docs",
            "Category": "Anime"
        }
    ]
}
```

###  Task 3: Implement Swagger Documentation
- Docs Link: https://pioneer-labs-assignment.onrender.com/

### Task 4: Secure API Endpoint for Authenticated Users Only

- API Endpoint: /protected/
- accessToken should be passed in the headers

```Curl
curl -X 'GET' \
  'https://pioneer-labs-assignment.onrender.com/protected/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlNyZWUgSGFyc2hhIiwidXNlcklkIjoiNjYwMjllMTVkYWFjMWFhZDI0YzA5NGQ0IiwiaWF0IjoxNzExNDYzMzQ5fQ.twZeoWMizyHPDn6Vb_Sy5VaAU9-35T1jdb9NMrULhws'
```
- Example response:
```json
{
    "Message": "User authenticated"
}
```
