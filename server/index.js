require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('../server/api/routes');
const connectToDb = require("../dbconfig/database");

const cors = require('cors');
app.use(cors());

connectToDb();

app.use(express.json());

// Centralized Route Handling
app.use('/api', routes);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/* Add our own error handler */
app.use((err, req, res, next) => {
    if (err.name === 'AlabalaError') {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        /* For any other error - send a generic error to ensure that we don't leak information */
        console.error(`error stack: ${err.stack}`);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = app;
