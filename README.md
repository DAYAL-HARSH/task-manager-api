# Live API : https://task-manager-api-production-6b48.up.railway.app

# Task Manager API
 
A REST API for managing tasks with user authentication built with Node.js, Express and MongoDB.

## Features

- User registration and login
- JWT authentication
- Password encryption with bcrypt
- Protected routes with middleware
- Full CRUD operation for tasks
- Error handling and data validation

## Technologies Used
 
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Installation

1. Clone the repository : 
git clone https://github.com/DAYAL-HARSH/task-manager-api

2. Install Depedencies : 
npm install

3. Create .env file in root folder : 
- MONGO_URL = your_mongodb_connection_string
- PORT = 5000
- JWT_SECRET = your_secret_key

4. Run the server : 
- npm run dev

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Tasks (Protected Routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks|
| POST | /api/tasks/:id | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## Authentication
All task routes require a Bearer token in the authorization header:
Authorization : Bearer your_token_here

### Register Request
```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

### Login Request
```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

### Create Task Request
```json
{
  "title": "My task",
  "description": "Task description"
}
```

### Update Task Request
```json
{
  "title": "Updated task",
  "completed": true
}
```

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Bad request or validation error |
| 401 | Unauthorized, invalid or missing token |
| 404 | Resource not found |
| 500 | Internal server error |

## Project Structure

task-manager-api/
 ├── controllers/
 │   ├── authController.js
 │   └── taskController.js
 ├── middleware/
 │   └── auth.js
 ├── models/
 │   ├── User.js
 │   └── Task.js
 ├── routes/
 │   ├── authRoutes.js
 │   └── taskRoutes.js
 ├── .env
 ├── server.js
 └── package.json

## Author 
HARSH DAYAL
- GitHub :  https://github.com/DAYAL-HARSH
- LinkedIn : www.linkedin.com/in/harsh-dayal-770862363
- Email : harshdayal149@gmail.com
