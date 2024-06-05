const Task = require("../models/task.model");
const Project = require("../models/project.model");

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
    try {
      const task = new Task(req.body);
      const project = await Project.findById(task.project);
  
      if (!project) {
        return res.status(404).send("Project not found");
      }
  
      let statusFound = false;
  
      for (const element of project.status) {
        if (element._id.toString() === task.status._id.toString()) {
          task.status = element;
          statusFound = true;
          await task.save();
          return res.status(201).send(task);
        }
      }
  
      if (!statusFound) {
        console.log("task status not found in project");
        return res.status(404).send("Status not found in project");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  

// Lire toutes les tâches
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("users project");
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Lire une tâche par ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("users project");
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Mettre à jour une tâche par ID
exports.updateTask = async (req, res) => {
    try {
      let task = await Task.findById(req.params.id).populate("users project");
  
      if (!task) {
        return res.status(404).send("Task not found");
      }
  
      if (req.body.status && req.body.status._id) {
        const project = await Project.findById(task.project);
  
        if (!project) {
          return res.status(404).send("Associated project not found");
        }
  
        const statusFound = project.status.some(
          (element) => element._id.toString() === req.body.status._id.toString()
        );
  
        if (!statusFound) {
          return res.status(404).send("Status not found in project");
        }
      }
  
      task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate("users project");
  
      res.status(200).send(task);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  

// Supprimer une tâche par ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Récupérer les tâches par utilisateur
exports.getTaskByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ users: req.params.userId }).populate(
      "users project"
    );
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = exports;
