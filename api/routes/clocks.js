const express = require('express');
const debug = require('debug')('app:routes');
const router = express.Router();
const CURR_ROUTE = '/clocks';
const Clock = require('../database/models/Clock');

//Log
router.use((req, res, next) => {
    debug(`Entering ${CURR_ROUTE}`);
    next();
});

//POST
router.post('/in', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/in`);
    Clock.clockIn()
        .then(result => {
            if (result.success) {
                res.status(201).json({
                    message: 'Clocked in',
                    time: result.time
                });
            } else {
                res.status(400).json({ error: { message: result.message } });
            }
        })
        .catch(err => next(err));
});
router.post('/out', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/out`);
    Clock.clockOut()
        .then(result => {
            if (result.success) {
                res.status(201).json({
                    message: 'Clocked out',
                    clock: result.clock
                });
            } else {
                res.status(400).json({ error: { message: result.message } });
            }
        })
        .catch(err => next(err));
});

module.exports = router;
