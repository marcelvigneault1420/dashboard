const express = require('express');
const debug = require('debug')('app:routes');
const router = express.Router();
const CURR_ROUTE = '/clocks';
const queries = require('../database/queries/clocks');

//Log
router.use((req, res, next) => {
    debug(`ROUTE Entering ${CURR_ROUTE}`);
    next();
});

//POST
router.post('/in', queries.clockIn);
router.post('/out', queries.clockOut);

//Log
router.use((req, res, next) => {
    debug(`ROUTE NOT FOUND ${CURR_ROUTE}`);
    next();
});
module.exports = router;
