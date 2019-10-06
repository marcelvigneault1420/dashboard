const { pool } = require('../config');
const debug = require('debug')('app:routes');
const CURR_ROUTE = '/clocks';

const clockIn = (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/in`);
    pool.query('SELECT COUNT(*) FROM clocks WHERE clock_out IS NULL')
        .then(results => {
            if (results.rows[0].count === '0') {
                pool.query(
                    'INSERT INTO clocks(clock_in) VALUES (NOW()) RETURNING clock_in'
                )
                    .then(results2 => {
                        res.status(201).json({
                            message: 'Clocked in',
                            time: results2.rows[0].clock_in
                        });
                    })
                    .catch(err => {
                        console.log(err.message);
                        next(err);
                    });
            } else {
                res.status(400).json({
                    error: {
                        message: 'Please clock out before clock in'
                    }
                });
            }
        })
        .catch(err => {
            console.log(err.message);
            next(err);
        });
};

const clockOut = (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/out`);
    pool.query('SELECT COUNT(*) FROM clocks WHERE clock_out IS NULL').then(
        results => {
            if (results.rows[0].count === '0') {
                res.status(400).json({
                    error: {
                        message: 'Nothing to clock out'
                    }
                });
            } else {
                pool.query(
                    'UPDATE clocks SET clock_out = NOW() WHERE clock_out IS NULL RETURNING clock_out'
                )
                    .then(results2 => {
                        res.status(201).json({
                            message: 'Clocked out',
                            time: results2.rows[0].clock_out
                        });
                    })
                    .catch(err => {
                        console.log(err.message);
                        next(err);
                    });
            }
        }
    );
};

module.exports = { clockIn, clockOut };
