const express = require('express');
const debug = require('debug')('app:routes');
const router = express.Router();
const CURR_ROUTE = '/api';
const bodyParser = require('body-parser');
const checkAuth = require('./middleware/check-auth');

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
const accountsRoute = require('./routes/accounts');
const postsRoute = require('./routes/posts');
const clocksRoute = require('./routes/clocks');
router.use('/accounts', accountsRoute);
router.use(checkAuth);
router.use('/posts', postsRoute);
router.use('/clocks', clocksRoute);
//404
router.use((req, res, next) => {
    debug(`404 NOT FOUND in ${CURR_ROUTE} path: ${req.path}`);
    res.status(404).json({ error: { message: 'Route not found' } });
});

module.exports = router;
