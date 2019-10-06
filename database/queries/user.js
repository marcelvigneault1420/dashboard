const { pool } = require('../config');
const debug = require('debug')('app:routes');
const CURR_ROUTE = '/users';

const signUp = (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/signUp`);
};

const signIn = (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/signIn`);
};

module.exports = { signUp, signIn };
