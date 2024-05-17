const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    endTask: { type: Date },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed", "canceled", "archived"],
        default: "pending"
    },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
