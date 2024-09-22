const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

module.exports = router;
