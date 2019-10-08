const { pool } = require('../config');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:database');
const CURR_TABLE = 'Account';
const validator = require('validator');

class Account {
    static signUp({ email, password }) {
        return new Promise((resolve, reject) => {
            debug(`signUp on ${CURR_TABLE}`);
            if (!validator.isEmail(email)) {
                debug(`Error: Email not valid`);
                resolve({
                    success: false,
                    message: 'Email not valid'
                });
            } else {
                pool.query(
                    `SELECT COUNT(id) AS count FROM account WHERE email = $1`,
                    [email]
                )
                    .then(alreadyExistResult => {
                        if (
                            alreadyExistResult.rows[0].count.toString() === '0'
                        ) {
                            bcrypt
                                .hash(password, 10)
                                .then(hashPassword => {
                                    pool.query(
                                        `INSERT INTO account (email, password) VALUES ($1, $2) RETURNING id, email`,
                                        [email, hashPassword]
                                    )
                                        .then(result => {
                                            debug(`Success`);
                                            resolve({
                                                success: true,
                                                account: result.rows[0]
                                            });
                                        })
                                        .catch(err => reject(err));
                                })
                                .catch(err => reject(err));
                        } else {
                            debug(`Error: Email already exist`);
                            resolve({
                                success: false,
                                message: 'Email already exist'
                            });
                        }
                    })
                    .catch(err => reject(err));
            }
        });
    }

    static signIn({ email, password }) {
        return new Promise((resolve, reject) => {
            debug(`signIn on ${CURR_TABLE}`);
            if (!validator.isEmail(email)) {
                debug(`Error: Email not valid`);
                resolve({
                    success: false,
                    message: 'Email not valid'
                });
            } else {
                pool.query(
                    `SELECT id, password FROM account WHERE email = $1`,
                    [email]
                )
                    .then(result => {
                        if (result.rowCount !== 1) {
                            debug(`Error: Email not found`);
                            resolve({
                                success: false,
                                message: 'Email not found'
                            });
                        } else {
                            bcrypt
                                .compare(password, result.rows[0].password)
                                .then(isRight => {
                                    if (isRight) {
                                        resolve({
                                            success: true,
                                            id: result.rows[0].id
                                        });
                                    } else {
                                        debug(`Error: Invalid password`);
                                        resolve({
                                            success: false,
                                            message: 'Invalid password'
                                        });
                                    }
                                })
                                .catch(err => reject(err));
                        }
                    })
                    .catch(err => reject(err));
            }
        });
    }
}

module.exports = Account;
