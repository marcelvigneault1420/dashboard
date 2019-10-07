const express = require('express');
const debug = require('debug')('app:routes');
const router = express.Router();
const CURR_ROUTE = '/accounts';
const Account = require('../database/models/Account');

//Log
router.use((req, res, next) => {
    debug(`Entering ${CURR_ROUTE}`);
    next();
});

//POST
router.post('/signup', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/signup`);
    Account.signUp(req.body)
        .then(result => {
            if (result.success) {
                res.status(201).json({
                    account: result.account,
                    message: result.message
                });
            } else {
                res.status(409).json({ error: { message: result.message } });
            }
        })
        .catch(err => next(err));
});

//Log
router.use((req, res, next) => {
    debug(`NOT FOUND ${CURR_ROUTE}`);
    next();
});

module.exports = router;
