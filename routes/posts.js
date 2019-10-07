const express = require('express');
const router = express.Router();
const debug = require('debug')('app:routes');
const CURR_ROUTE = '/posts';
const { pool } = require('../database/config');

//Log
router.use((req, res, next) => {
    debug(`Entering ${CURR_ROUTE}`);
    next();
});

//GET
router.get('/', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/`);
    res.status(200).json({ message: 'GET /posts' });
});
router.get('/:id', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/:id`);
    res.status(200).json({
        message: 'GET /post/id',
        id: req.params.id
    });
});

//POST
router.post('/', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/`);
    res.status(201).json({
        message: 'POST /posts',
        body: req.body
    });
});

//PATCH
router.patch('/:id', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/:id`);
    res.status(200).json({
        message: 'DELETE /post/id',
        id: req.params.id,
        newBody: req.body
    });
});

//DELETE
router.delete('/:id', (req, res, next) => {
    debug(`${req.method} on ${CURR_ROUTE}/:id`);
    res.status(200).json({
        message: 'DELETE /post/id',
        id: req.params.id
    });
});

//Log
router.use((req, res, next) => {
    debug(`NOT FOUND ${CURR_ROUTE}`);
    next();
});

module.exports = router;
