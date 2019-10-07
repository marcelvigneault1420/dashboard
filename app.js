//Server
const express = require('express');
const app = express();
const moment = require('moment');

//Logs
const log = require('debug')('app');
const httpLog = require('debug')('app:http');

//Routes
const postsRoute = require('./routes/posts');
const clocksRoute = require('./routes/clocks');
const accountsRoute = require('./routes/accounts');

//Middlewares
const bodyParser = require('body-parser');
const cors = require('cors');

//Env variables
require('dotenv').config();

/**
 * Middlewares
 */
//CORS
app.use(cors());
//POST body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
//Custom routes
app.use('/posts', postsRoute);
app.use('/clocks', clocksRoute);
app.use('/accounts', accountsRoute);
//404 routes
app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Route not found' } });
});
//Error handling route
app.use((err, req, res, next) => {
    console.error(err.message || 'No message in the error');
    res.status(500).json({ error: { message: 'Unexpected error' } });
});

/**
 * Server listener
 */
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    log('Debug mode enabled');
});
