const express = require('express');
const debug = require('debug')('app:routes');
const router = express.Router();
const CURR_ROUTE = '/accounts';
const queries = require('../database/queries/account');

//Log
router.use((req, res, next) => {
    debug(`ROUTE Entering ${CURR_ROUTE}`);
    next();
});

//POST
router.post('/signup', queries.signUp);
router.post('/signin', queries.signIn);

//Log
router.use((req, res, next) => {
    debug(`ROUTE NOT FOUND ${CURR_ROUTE}`);
    next();
});

module.exports = router;
