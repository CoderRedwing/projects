const Todo = require('../models/todoModel')

const createTodo = async (req,res) => {
    const {title, description} = req.body;

    try {
        const newTodo = new Todo({
            userId: req.user.userId,
            title,
            description,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
        
    } catch (error) {
        res.status(500).json({message: 'server error'});
        
    }
};

// get all todos with pagination

const getTodos = async (req, res) => {
    const {page=  1, limit = 10 } = req.query;

    try {
        const todos = await Todo.find({userId: req.user.userId})
        .limit(limit*1)
        .skip((page - 1)*limit);
        const total = await Todo.countDocuments({userId: req.user.userId});
        res.status(200).json({data: todos, page: Number(page), limit: Number(limit).total});
        
    } catch (error) {
        res.status(500).json({message: 'server error'})
        
    }
};

// update todo

const updateTodo = async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;

    try {
        const todo = await Todo.findById(id);
        if (!todo || todo.user.toString() !== req.user.userId) {
            return res.status(403).json({message: 'Forbidden'});
        }
        todo.title = title,
        todo.description = description,
        todo.updatedAt = Date.now();
        await todo.save();
        res.status(200).json(todo);        
    } catch (error) {
        res.status(500).json({message: 'server error'});
        
    }
};

// delete todo

const deleteTodo = async (req, res) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findById(id);
        if (!todo || todo.user.toString() !== req.user.userId ) {
            return res.status(403).json({message: 'Forbidden'});
        }
        await todo.remove();
        res.status(200).send();
        
    } catch (error) {
        res.status(500).json({message: 'server error'});
        
    }
};

module.exports = {createTodo, getTodos, updateTodo, deleteTodo};