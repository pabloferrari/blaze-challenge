const express = require('express');
const { PORT } = require('./environments');

// Connect to db
const db = require('./config/database');
db.connect();

// Import routes
const routes = require('./routes');

const app = express();

app.use(routes);

app.listen(PORT, () => { console.log(`App is runing in port ${PORT}!`); });
