const Task = require("../models/task.model");

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
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
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate("users project");
        if (!task) {
            return res.status(404).send("Task not found");
        }
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
        const tasks = await Task.find({ users: req.params.userId }).populate("users project");
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Récupérer les tâches par projet
exports.getTaskByProject = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId }).populate("users project");
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = exports;
