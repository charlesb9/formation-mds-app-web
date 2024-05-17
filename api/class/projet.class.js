class Projet {
    constructor(id, title, users, description, createdAt, updatedAt, endTask, status, project, priority) {
        this.id = id;
        this.title = title;
        this.users = users;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.endTask = endTask;
        this.status = status;
        this.project = project;
        this.priority = priority;
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }


    get title() {
        return this.title;
    }

    set title(title) {
        this.title = title;
    }

    get users() {
        return this.users;
    }

    set users(users) {
        this.users = users;
    }

    get description() {
        return this.description;
    }

    set description(description) {
        this.description = description;
    }

    get createdAt() {
        return this.createdAt;
    }

    set createdAt(createdAt) {
        this.createdAt = createdAt;
    }

    get updatedAt() {
        return this.updatedAt;
    }

    set updatedAt(updatedAt) {
        this.updatedAt = updatedAt;
    }

    get endTask() {
        return this.endTask;
    }

    set endTask(endTask) {
        this.endTask = endTask;
    }

    get status() {
        return this.status;
    }

    set status(status) {
        this.status = status;
    }

    get project() {
        return this.project;
    }

    set project(project) {
        this.project = project;
    }

    get priority() {
        return this.priority;
    }

    set priority(priority) {
        this.priority = priority;
    }

    //fromMap
    static fromMap(map) {
        return new Projet(map.id, map.title, map.users, map.description, map.createdAt, map.updatedAt, map.endTask, map.status, map.project, map.priority);
    }

    //toMap 
    toMap() {
        return {
            id: this.id,
            title: this.title,
            users: this.users,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            endTask: this.endTask,
            status: this.status,
            project: this.project,
            priority: this.priority
        };
    }
}

export default Projet;