const fs = require('fs');
const pg = require('pg');

const debug = require('debug')('app:database');

//Env variables
require('dotenv').config();

const CONN_STRING =
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASS}@${process.env.DEV_DB_HOST}:${process.env.DEV_DB_PORT}/${process.env.DEV_DB_DATABASE}`;
const SSL = process.env.NODE_ENV === 'production';

const pool = new pg.Pool({
    connectionString: CONN_STRING,
    max: 10, // max number of clients in the pool
    ssl: SSL
});

pool.on('connect', () => {
    debug(`Connected to db postgresql`);
});

pool.on('error', err => {
    debug(`DB ERROR: ${err}`);
});

const create_database = () => {
    let sql = fs.readFileSync('./api/database/db-creation.sql').toString();
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
