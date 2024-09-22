const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a todo item
router.post('/', protect, createTodo);

// Get all todos (with pagination)
router.get('/', protect, getTodos);

// Update a todo item
router.put('/:id', protect, updateTodo);

// Delete a todo item
router.delete('/:id', protect, deleteTodo);

module.exports = router;
