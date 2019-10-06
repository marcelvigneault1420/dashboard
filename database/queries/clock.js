const { pool } = require('../config');
const debug = require('debug')('app:routes');
const CURR_ROUTE = '/clocks';

const clockIn = (req, res, next) => {
    debug(`ROUTE ${req.method} on ${CURR_ROUTE}/in`);
    pool.query('SELECT COUNT(*) FROM clock WHERE out_time IS NULL')
        .then(results => {
            if (results.rows[0].count === '0') {
                pool.query(
                    'INSERT INTO clock(in_time) VALUES (NOW()) RETURNING in_time'
                )
                    .then(results2 => {
                        res.status(201).json({
                            message: 'Clocked in',
                            time: results2.rows[0].in_time
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
    pool.query('SELECT COUNT(*) FROM clock WHERE out_time IS NULL').then(
        results => {
            if (results.rows[0].count === '0') {
                res.status(400).json({
                    error: {
                        message: 'Nothing to clock out'
                    }
                });
            } else {
                pool.query(
                    'UPDATE clock SET out_time = NOW() WHERE out_time IS NULL RETURNING out_time'
                )
                    .then(results2 => {
                        res.status(201).json({
                            message: 'Clocked out',
                            time: results2.rows[0].out_time
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
