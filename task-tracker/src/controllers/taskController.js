const fs = require('fs');
const Task = require('../models/task');

const {readTasks, writeTasks} = require('../services/taskService');

const addTask = (description) => {
    const tasks = readTasks();
    const newTask = new Task(tasks.length +1, description);
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added succesfully (ID: ${newTask.id})`);
}

const updateTask = (id,description) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === Number(id));
    if (task){
        task.update(description);
        writeTasks(tasks);
        console.log(`Task updated successfullly (ID: ${id})`)
    }else {
        console.log(`Task with ID ${id} not found`)
    }

}

const deleteTask = (id) => {
    let tasks = readTasks();
    tasks = tasks.filter(t => t.id !== id);
    writeTasks(tasks);
    console.log(`Task deleted successfully (ID: ${id})`);

}

const markTaskStatus = (id, status) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.updateStatus(status);
        writeTasks(tasks);
        console.log(`Task marked as ${status} (ID: ${id})`);
    }else{
        console.log(`Task with ID ${id} not fount`);
    }
}

const listTasks = (filter) => {
    const tasks = readTasks();
    const filteredTask = filter ? tasks.filter(t => t.status === filter) : tasks;
    console.log(filteredTask)

}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    markTaskStatus,
    listTasks
}