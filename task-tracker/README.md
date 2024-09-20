Here’s a basic template for the README file of your **Task Tracker** project:

---

# Task Tracker CLI

Task Tracker is a simple command-line interface (CLI) application for tracking and managing tasks. It allows users to add, update, delete, and list tasks. Each task has properties such as description, status, and timestamps.

## Features

- Add tasks
- Update task descriptions
- Delete tasks
- Mark tasks as in-progress or done
- List tasks by status

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/task-tracker.git
```

2. Navigate to the project directory:

```bash
cd task-tracker
```

3. Install dependencies:

```bash
npm install
```

## Usage

You can interact with the task tracker using the following commands:

### Add a Task

```bash
npm start add "Buy groceries"
```

### Update a Task

```bash
npm start update 1 "Buy groceries and cook dinner"
```

### Delete a Task

```bash
npm start delete 1
```

### Mark Task as In Progress

```bash
npm start mark-in-progress 1
```

### Mark Task as Done

```bash
npm start mark-done 1
```

### List Tasks

To list all tasks:

```bash
npm start list
```

To list tasks by status (e.g., "todo", "in-progress", "done"):

```bash
npm start list todo
```

## Task Properties

Each task has the following properties:
- `id`: A unique identifier for the task
- `description`: The task description
- `status`: Task status (`todo`, `in-progress`, `done`)
- `createdAt`: Timestamp when the task was created
- `updatedAt`: Timestamp when the task was last updated

