const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true

    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['todo','in-progress', 'done'],
        default: 'todo'
    }

},{
    timestamps: true,

});

const Todo = mongoose.model('todo',todoSchema);

module.exports = Todo;