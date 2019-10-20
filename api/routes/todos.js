const express = require('express');
const router = express.Router();
const Todo = require('../database/models/Todo');
const debug = require('debug')('app:routes');
const CURR_ROUTE = '/todos';

//Log
router.use((req, res, next) => {
    debug(`Entering ${CURR_ROUTE}`);
    next();
});

router.get('/', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/`);
    Todo.getAll(req.userData.id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => next(err));
});
router.post('/', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/`);
    Todo.add(req.body.name, req.userData.id)
        .then(result => {
            res.status(201).json({
                todo: result,
                message: 'Todo created'
            });
        })
        .catch(err => next(err));
});

module.exports = router;
