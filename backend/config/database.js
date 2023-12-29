const { Client } = require('pg');
const { DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT,DB_HOST } = require('./environments');

const dbConfig = {
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT
};

let client;

const connectWithRetry = async () => {
    while (true) {
        try {
            client = new Client(dbConfig);
            await client.connect();
            console.log('Successful connection to PostgreSQL');
            break;
        } catch (error) {
            console.error('Error connecting to PostgreSQL:', error.message);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

module.exports = {
    connect: connectWithRetry,
    connection: () => {
        if (client && client.query) {
            return client;
        }
        console.error('Error. Please, call to connect()');
        return null;
    },
};