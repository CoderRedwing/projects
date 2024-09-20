const fs = require('fs');
const Task = require('../models/task');
const path = './tasks.json';

const readTasks = () => {
    if (!fs.existsSync(path)) {
        return [];
    }
    const data = fs.readFileSync(path);
    const tasks = JSON.parse(data);

    // Convert each plain object into an instance of Task
    return tasks.map(task => new Task(task.id, task.description, task.status));
};

const writeTasks = (tasks) => {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
};

module.exports = { readTasks, writeTasks };
