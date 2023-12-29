const { Client } = require('pg');
const { DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT,DB_HOST } = require('./environments');

const dbConfig = {
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT
};

const client = new Client(dbConfig);

module.exports = {
    connect: async () => {
        try {
            await client.connect();
            console.log('Successful connection to PostgreSQL');
        } catch (error) {
            console.error('Error connecting to PostgreSQL:', error.message);
        }
    },
    connection: () => {
        if (client && client.query) {
            return client;
        }
        console.error('Error. Please, call to connect()');
        return null;
    },
};
