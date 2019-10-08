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
const path = require('path');

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
//API
const apiServer = require('./api');
app.use('/api', apiServer);
//Front-end route
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
//404 routes
app.use((req, res, next) => {
    httpLog(`404 NOT FOUND path: ${req.path}`);
    res.status(404).end();
});
//Error handling route
app.use((err, req, res, next) => {
    errorlog(err);
    res.status(500).json({ error: { message: 'Unexpected error' } });
});

/**
 * Server listener
 */
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}... | env: ${ENV}`);
    log('Debug mode enabled');
});
