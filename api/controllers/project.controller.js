const Project = require("../models/project.model");

// Create - Créer un nouveau projet
exports.createProject = async (req, res) => {
    try {
        const nouveauProjet = new Project(req.body);
        await nouveauProjet.save();
        res.status(201).json({ success: true, message: "Projet créé avec succès", data: nouveauProjet });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la création du projet", error: error.message });
    }
};

// Read - Obtenir tous les projets
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des projets", error: error.message });
    }
};

// Read - Obtenir un projet par ID
exports.getProjectById = async (req, res) => {
    try {
        const projet = await Project.findById(req.params.id);
        if (!projet) {
            return res.status(404).json({ success: false, message: "Projet non trouvé" });
        }
        res.status(200).json({ success: true, data: projet });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération du projet", error: error.message });
    }
};

// Update - Mettre à jour un projet
exports.updateProject = async (req, res) => {
    try {
        const projet = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!projet) {
            return res.status(404).json({ success: false, message: "Projet non trouvé" });
        }
        res.status(200).json({ success: true, message: "Projet mis à jour avec succès", data: projet });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour du projet", error: error.message });
    }
};

// Delete - Supprimer un projet
exports.deleteProject = async (req, res) => {
    try {
        const projet = await Project.findByIdAndDelete(req.params.id);
        if (!projet) {
            return res.status(404).json({ success: false, message: "Projet non trouvé" });
        }
        res.status(200).json({ success: true, message: "Projet supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression du projet", error: error.message });
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
