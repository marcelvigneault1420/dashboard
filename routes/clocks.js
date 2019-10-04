const express = require('express');
const debug = require('debug')('app:routes');
const router = express.Router();
const CURR_ROUTE = '/clocks';
const { pool } = require('../database/config');

//Log
router.use((req, res, next) => {
    debug(`ROUTE Entering ${CURR_ROUTE}`);
    next();
});

//POST
router.post('/in', (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/in`);
    pool.query('SELECT COUNT(*) FROM clocks WHERE clockOut IS NULL')
        .then(results => {
            if (results.rows[0].count === '0') {
                pool.query(
                    'INSERT INTO clocks(clockIn) VALUES (NOW()) RETURNING clockIn'
                )
                    .then(clockIn => {
                        res.status(201).json({
                            message: 'Clocked in',
                            time: clockIn.rows[0].clockin
                        });
                    })
                    .catch(err => {
                        console.log(err.message);
                        next(err);
                    });
            } else {
                next({
                    custommessage: 'Please clock out before clock in',
                    status: 400
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            next(err);
        });
});
router.post('/out', (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/out`);
    pool.query('SELECT COUNT(*) FROM clocks WHERE clockOut IS NULL').then(
        results => {
            if (results.rows[0].count === '0') {
                next({
                    custommessage: 'Nothing to clock out',
                    status: 400
                });
            } else {
                pool.query(
                    'UPDATE clocks SET clockOut = NOW() WHERE clockOut IS NULL RETURNING clockOut'
                )
                    .then(clockOut => {
                        res.status(201).json({
                            message: 'Clocked out',
                            time: clockOut.rows[0].clockout
                        });
                    })
                    .catch(err => {
                        console.log(err.message);
                        next(err);
                    });
            }
        }
    );
});

//Log
router.use((req, res, next) => {
    debug(`ROUTE NOT FOUND ${CURR_ROUTE}`);
    next();
});
module.exports = router;
