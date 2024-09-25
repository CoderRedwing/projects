const Todo = require('../models/todoModel')

const createTodo = async (req,res) => {
    const {title, description} = req.body;
    try {
        const newTodo = new Todo({
            user: req.user._id.toString(),
            title,
            description,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
        
    } catch (error) {
        
        res.status(500).json({message: 'server error',error});
        
    }
};

// get all todos with pagination

const getTodos = async (req, res) => {
    const {page=  1, limit = 10 } = req.query;

    try {
        const todos = await Todo.find({user:req.user._id.toString()})
        const total = await Todo.countDocuments({user: req.user._id});
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
        

        if (!todo) {
            console.warn(`Todo with ID ${id} not found`); // Log a warning if not found
            return res.status(404).json({ message: 'Todo not found' });
        }


        if (!todo || todo.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: 'Forbidden'});
        }
        todo.title = title,
        todo.description = description,
        todo.updatedAt = Date.now();
        await todo.save("todo updated successfully");

        res.status(200).json(todo);        
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({message: 'server error'});
        
    }
};

// delete todo

const deleteTodo = async (req, res) => {
    const {id} = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            console.warn(`Todo with ID ${id} not found`); // Log if todo not found
            return res.status(404).json({ message: 'Todo not found' });
        }


        if (!todo || todo.user.toString() !== req.user._id.toString() ) {
            
            return res.status(403).json({message: 'Forbidden'});
        }
        // await todo.remove();
        
        res.status(200).send("todo deleted");
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'});
        
    }
};

module.exports = {createTodo, getTodos, updateTodo, deleteTodo};