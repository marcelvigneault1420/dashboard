const express = require('express');
const debug = require('debug')('app:routes');
const router = express.Router();
const CURR_ROUTE = '/accounts';
const Account = require('../database/models/Account');
const jwt = require('jsonwebtoken');

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
                    message: 'Account created'
                });
            } else {
                res.status(409).json({ error: { message: result.message } });
            }
        })
        .catch(err => next(err));
});

router.post('/signin', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/signin`);
    Account.signIn(req.body)
        .then(result => {
            if (result.success) {
                const token = jwt.sign(
                    { id: result.id, email: req.body.email },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '5m'
                    }
                );

                res.status(201).json({
                    id: result.id,
                    token,
                    message: 'Logged in'
                });
            } else {
                res.status(401).json({
                    error: { message: `Invalid login/password` }
                });
            }
        })
        .catch(err => next(err));
});

module.exports = router;
