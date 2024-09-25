const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
const Todo = require('../models/todoModel');

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Read token from cookies
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

const authorizeUser = async (req, res, next) => {
    const todoId = req.params.id;
    const userId = req.user.id;
    

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (todo.user.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden, not authorized to access this resource' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server mn error' });
    }
};

const protect = async (req, res, next) => {
    const token = req.cookies.token; // Read token from cookies
    if (token) {
        try {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.user[0]._id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { authenticateToken, authorizeUser, protect };
