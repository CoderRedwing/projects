#!/usr/bin/env node

const { addTask, updateTask, deleteTask, markTaskStatus, listTasks} = require('../src/controllers/taskController');

const commond = process.argv[2];
const args = process.argv.slice(3);

switch (commond) {
    case 'add':
        addTask(args[0]);
        break;

    case 'update':
        const id = parseInt(args[0],10);
        const description = args.slice(1).join('');
        updateTask(id, description);
        break
    
    case 'delete':
        deleteTask(parseInt(args[0], 10));
        break

    case 'mark-in-progress':
        markTaskStatus(parseInt(args[0],10),'in-progress');
        break

    case 'mark-done':
        markTaskStatus(parseInt(args[0],10),'done');
        break

    case 'list':
        listTasks(args[0]);
        break

    default:
        console.log("unknown commond");
}



