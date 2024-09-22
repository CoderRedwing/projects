# Todo API Project

This project is a RESTful API built with Node.js, Express, and MongoDB for managing a to-do list. The API allows users to register, login, and manage their to-do tasks with full authentication and authorization features.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete (CRUD) operations for to-do items
- Pagination and filtering of to-do items
- Proper error handling and security implementation

## Requirements

- Node.js
- MongoDB
- Postman (for testing API requests)

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd todo-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:

   ```bash
   npm start
   ```

   or for development with automatic restarts:

   ```bash
   npm run dev
   ```

5. The API will run at `http://localhost:5000`.

## API Endpoints

### User Authentication

- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`

### Todo Items

- **Create Todo**: `POST /api/todos` (Requires Token)
- **Get Todos**: `GET /api/todos?page=1&limit=10` (Requires Token)
- **Update Todo**: `PUT /api/todos/:id` (Requires Token)
- **Delete Todo**: `DELETE /api/todos/:id` (Requires Token)

### Example Requests

#### Register a New User
```bash
curl -X POST http://localhost:5000/api/users/register \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}'
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/users/login \
-H "Content-Type: application/json" \
-d '{
    "email": "john@example.com",
    "password": "password123"
}'
```

