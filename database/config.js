const fs = require('fs');
const pg = require('pg');

const debug = require('debug')('app:database');

//Env variables
require('dotenv').config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    max: 10 // max number of clients in the pool
});

pool.on('connect', () => {
    debug(
        `Connected to db ${process.env.DB_DATABASE}@${process.env.DB_HOST}:${process.env.DB_PORT} with user ${process.env.DB_USER}`
    );
});

const create_database = () => {
    let sql = fs.readFileSync('./database/db-creation.sql').toString();
    pool.query(sql)
        .then(results => {
            console.log('Database updated');
            pool.end();
        })
        .catch(err => {
            console.log(err.message);
            pool.end();
        });
};

module.exports = { pool, create_database };
