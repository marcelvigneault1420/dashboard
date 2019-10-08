const { pool } = require('../config');
const debug = require('debug')('app:database');
const CURR_TABLE = 'Clock';

class Clock {
    static clockIn() {
        return new Promise((resolve, reject) => {
            debug(`clockIn on ${CURR_TABLE}`);
            pool.query('SELECT COUNT(*) FROM clock WHERE out_time IS NULL')
                .then(results => {
                    if (results.rows[0].count === '0') {
                        pool.query(
                            'INSERT INTO clock(in_time) VALUES (NOW()) RETURNING in_time'
                        )
                            .then(results2 => {
                                debug(`Success`);
                                resolve({
                                    success: true,
                                    time: results2.rows[0].in_time
                                });
                            })
                            .catch(err => {
                                reject(err);
                            });
                    } else {
                        debug(`Error: Already clocked in`);
                        resolve({
                            success: false,
                            message: 'Please clock out before clock in'
                        });
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    static clockOut() {
        return new Promise((resolve, reject) => {
            debug(`clockOut on ${CURR_TABLE}`);
            pool.query('SELECT COUNT(*) FROM clock WHERE out_time IS NULL')
                .then(results => {
                    if (results.rows[0].count === '0') {
                        debug(`Error: Not clocked in`);
                        resolve({
                            success: false,
                            message: 'Please clock in before clock out'
                        });
                    } else {
                        pool.query(
                            'UPDATE clock SET out_time = NOW() WHERE out_time IS NULL RETURNING in_time, out_time'
                        )
                            .then(results2 => {
                                debug(`Success`);
                                resolve({
                                    success: true,
                                    clock: results2.rows[0]
                                });
                            })
                            .catch(err => {
                                reject(err);
                            });
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

module.exports = Clock;
