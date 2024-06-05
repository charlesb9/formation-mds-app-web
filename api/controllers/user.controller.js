const User = require("../models/user.model");
const path = require("path");

// Lire tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Lire un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Mettre à jour un utilisateur par ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Supprimer un utilisateur par ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Créer un avatar pour un utilisateur
exports.createAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        if (!req.file) {
            return res.status(400).send("Fichier non téléchargé");
        }
        const relativePath = path.join("public", "uploads", req.file.filename).replace(/\\/g, "/");
        user.avatar = relativePath;
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = exports;
