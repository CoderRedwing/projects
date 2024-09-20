class Task {
    constructor(id, description, status = 'todo') {
        this.id = id;
        this.description = description;
        this.status = status;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    
    }

    update(description){
        this.description = description;
        this.updatedAt = new Date().toISOString();
    }

    updateStatus(status) {
        this.status = status;
        this.updatedAt = new Date().toISOString();
    }
}

module.exports = Task;