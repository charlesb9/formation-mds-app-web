const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { connect } = require('../config/database'); // Assurez-vous du bon chemin vers le fichier database.js

dotenv.config({ path: __dirname + '/../../.env.local' });

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Connectez-vous à la base de données
        const db = await connect();

        // Recherchez l'utilisateur par email
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(401).send('Utilisateur non trouvé');
        }

        // Vérifiez le mot de passe (assurez-vous de sécuriser les mots de passe en les hachant dans la base de données)
        if (user.password !== password) {
            return res.status(401).send('Mot de passe incorrect');
        }

        // Créez un token JWT
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.send({ email, token });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Connectez-vous à la base de données
        const db = await connect();

        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).send('Utilisateur déjà enregistré');
        }

        // Enregistrez le nouvel utilisateur (ajoutez des vérifications et un hachage de mot de passe pour plus de sécurité)
        await db.collection('users').insertOne({ email, password });

        res.send({ email });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

module.exports = exports;
