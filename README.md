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

