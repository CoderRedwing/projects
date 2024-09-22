require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const bodyParser = require('body-parser');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./config/db');

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
