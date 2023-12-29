const express = require('express');
const schedule = require('node-schedule');
const { PORT } = require('./config/environments');
const db = require('./config/database');
const { initializeRoutes } = require('./routes');
const { checkIfTablesAreEmpty, getLastMatches } = require('./utils/populateDatabase');

async function connectWithRetry() {
    while (true) {
        try {
            await checkIfTablesAreEmpty();
            console.log('Successfully connected to the tables.');
            break;
        } catch (error) {
            console.error('Error:', error);
            console.log('Try again in 10 seconds...');
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }
}

async function startServer() {

    const app = express();

    // Connect to db
    db.connect();

    // Initialize routes
    initializeRoutes(app);


    // Executes the check each time the server starts up
    connectWithRetry();

    schedule.scheduleJob('0 8 * * *', () => {
        getLastMatches();
    });

    // Error-handling middleware
    app.use((err, req, res, next) => {
        if (err) {
            // If the error is an object, send a JSON response
            if (typeof err === 'object') {
                console.log('ERROR', )
                return res.status(err.status || 500).json({ error: err.message });
            }
            // If not, send a plain text response
            return res.status(500).send(err.toString());
        }
        // If there's no error, move to the next middleware
        next();
    });

    app.listen(PORT, () => { console.log(`App is runing in port ${PORT}!`); });

}

startServer();