const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env.local' });

// URL de connexion à la base de données MongoDB
const url = process.env.DB_ADRESS;
const dbName = process.env.DB_NAME;

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client;
}

// Connexion à la base de données
async function connect() {
    try {
        const client = await connectToDatabase();
        console.log("Connexion réussie à la base de données");
        return client.db(dbName);
    } catch (error) {
        console.error("Erreur de connexion à la base de données:", error);
        throw error;
    }
}

module.exports = { connect };
