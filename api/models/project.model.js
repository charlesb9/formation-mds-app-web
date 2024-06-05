const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  title: { type: String, required: true },
  color: { type: String },
});

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  managers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  status: [statusSchema],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
