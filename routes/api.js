const express = require('express');
const debug = require('debug')('app:routes');
const router = express.Router();
const CURR_ROUTE = '/api';
const bodyParser = require('body-parser');

/**
 * Middleware
 */
//POST body parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use((req, res, next) => {
    debug(`Entering ${CURR_ROUTE}`);
    next();
});

/**
 * Routes
 */
//API routes
const postsRoute = require('./posts');
const clocksRoute = require('./clocks');
const accountsRoute = require('./accounts');
router.use('/posts', postsRoute);
router.use('/clocks', clocksRoute);
router.use('/accounts', accountsRoute);
//404
router.use((req, res, next) => {
    debug(`404 NOT FOUND in ${CURR_ROUTE}`);
    res.status(404).json({ error: { message: 'Route not found' } });
});

module.exports = router;
