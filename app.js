//Server
const express = require('express');
const app = express();
const moment = require('moment');

//Logs
const log = require('debug')('app');
const httpLog = require('debug')('app:http');
const errorlog = require('debug')('app:error');

//Middlewares
const cors = require('cors');
const ENV = process.env.NODE_ENV;

//Env variables
require('dotenv').config();

const PORT = process.env.PORT || process.env.DEV_PORT;

/**
 * Middlewares
 */
//CORS
app.use(cors());
//Request logger
app.use((req, res, next) => {
    httpLog(
        `${req.method} ${req.ip} ${req.path} ${moment().format(
            'YYYY/MM/DD HH:mm:ss:SSS'
        )}`
    );
    next();
});

/**
 * Routes
 */
//API route
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);
//Error handling route
app.use((err, req, res, next) => {
    errorlog(err);
    res.status(500).json({ error: { message: 'Unexpected error' } });
});
//404 routes
app.use((req, res, next) => {
    httpLog(`404 NOT FOUND ${req.path}`);
    res.status(404).json({ error: { message: 'Route not found' } });
});

/**
 * Server listener
 */
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}... | env: ${ENV}`);
    log('Debug mode enabled');
});
