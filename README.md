# Task Manager API
 
A REST API for managing tasks with user authentication built with Node.js, Express and MongoDB.

## 🔗 Live Links

- **Live API:** https://task-manager-api-production-6b48.up.railway.app
- **Frontend:** https://taskmanager-fronte.netlify.app
- **Frontend Repository:** https://github.com/DAYAL-HARSH/task-manager-frontend

## Features

- User registration and login
- JWT authentication with 7 day expiry
- Password encryption with bcrypt
- Protected routes with middleware
- Full CRUD operations for tasks
- Task filtering by status
- Error handling and data validation
- MongoDB Atlas cloud database

## 🛠️ Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Encryption:** bcryptjs
- **Deployment:** Railway

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository : 
- git clone https://github.com/DAYAL-HARSH/task-manager-api

2. Install Depedencies : 
- npm install

3. Create .env file in root folder : 
- MONGO_URL = your_mongodb_connection_string
- PORT = 5000
- JWT_SECRET = your_secret_key

4. Run the development server : 
- npm run dev
5. API will be running at 
- http://localhost:5000

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |

### Tasks (Protected Routes)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/tasks | Get all tasks | Yes |
| POST | /api/tasks | Create new task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |

## Authentication
All task routes require a Bearer token in the authorization header:
Authorization : Bearer your_token_here

## 📝 Request Examples

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

## 📊 Response Examples

### Successful Register/Login
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGci...",
  "user": {
    "id": "64f8a2...",
    "name": "John Doe",
    "email": "john@gmail.com"
  }
}
```

### Successful Task Creation
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "64f8a2...",
    "title": "My task",
    "description": "Task description",
    "completed": false,
    "user": "64f8a2...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
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
