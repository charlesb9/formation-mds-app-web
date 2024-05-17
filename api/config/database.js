const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../../.env.local' });

const user = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const address = process.env.DB_ADDRESS;
const dbName = process.env.DB_NAME;

const uri = `mongodb://${user}:${password}@${address}/${dbName}`;

const client = new MongoClient(uri);

async function connect() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db(dbName);
}

module.exports = { connect };
