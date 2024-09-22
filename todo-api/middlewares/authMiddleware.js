const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Unauthorized, token required'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if (err) {
            return res.status(403).json({message: 'invalid token'})
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
        if (!todo) return res.status(404).json({message: 'Todo not found'});

        if (todo.user.toString() !== userId) {
            return res.status(403).json({message: 'Forbidden, not authorized to access this resource'});
        }
        next();
        
    } catch (error) {
        res.status(500).json({message: 'server error'});
        
    }
};

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = {authenticateToken, authorizeUser, protect};