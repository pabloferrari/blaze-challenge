const express = require('express');
const { PORT } = require('./environments');
const { checkIfTablesAreEmpty, lastMatches } = require('./utils/populateDatabase');

// Connect to db
const db = require('./config/database');
db.connect();

// Import routes
const routes = require('./routes');

const app = express();

app.use(routes);



// Execute the check
checkIfTablesAreEmpty()
.catch((error) => {
    console.error('Error:', error);
});


app.listen(PORT, () => { console.log(`App is runing in port ${PORT}!`); });
