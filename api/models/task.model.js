const mongoose = require("mongoose");
const User = require("./user.model");

const taskSchema = new mongoose.Schema({
    id: String,
    title: String,
    users: [User],
    description: String,
    createdAt: Date,
    updatedAt: Date,
    endTask: Date,
    status: "pending" | "in-progress" | "completed" | "canceled" | "archived",
    project: Project,
    priority: "low" | "medium" | "high",
});

const Task = mongoose.model("User", taskSchema);

module.exports = Task;
