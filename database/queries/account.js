const { pool } = require('../config');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:routes');
const CURR_ROUTE = '/accounts';

const signUp = (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/signUp`);
    pool.query(`SELECT COUNT(id) AS count FROM account WHERE email = $1`, [
        req.body.email
    ])
        .then(alreadyExistResult => {
            if (alreadyExistResult.rows[0].count.toString() === '0') {
                bcrypt
                    .hash(req.body.password, 10)
                    .then(hashPassword => {
                        pool.query(
                            `INSERT INTO account (email, password) VALUES ($1, $2) RETURNING id, email`,
                            [req.body.email, hashPassword]
                        )
                            .then(result => {
                                res.status(201).json({
                                    message: 'Account created',
                                    account: result.rows[0]
                                });
                            })
                            .catch(err => {
                                next(err);
                            });
                    })
                    .catch(err => {
                        next(err);
                    });
            } else {
                res.status(409).json({
                    error: {
                        message: 'Email already exist'
                    }
                });
            }
        })
        .catch(err => {
            next(err);
        });
};

const signIn = (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/signIn`);
};

module.exports = { signUp, signIn };
