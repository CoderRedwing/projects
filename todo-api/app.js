require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');  // Added for handling cookies
const swaggerUi = require('swagger-ui-express'); // Added for Swagger
const swaggerJsDoc = require('swagger-jsdoc');  // Added for Swagger

// Import Routes
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./config/db');

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'API for managing Todo tasks with user authentication',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ['./routes/*.js'],  // Path to the route files for Swagger docs
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger UI route

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Added for handling cookies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
