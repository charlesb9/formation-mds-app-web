const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    tasks: [Task],
    users: [User],
    managers: [User],
    status: [Status],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
