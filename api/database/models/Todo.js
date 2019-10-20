const { pool } = require('../config');
const debug = require('debug')('app:database');
const CURR_TABLE = 'Todo';

class Todo {
    static getAll(userId) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id, name, done, created_at FROM todo WHERE account_id = $1`,
                [userId]
            )
                .then(result => resolve(result.rows))
                .catch(err => reject(err));
        });
    }

    static add(name, userId) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO todo (name, account_id) VALUES ($1, $2) RETURNING id, name`,
                [name, userId]
            )
                .then(result => resolve(result.rows[0]))
                .catch(err => reject(err));
        });
    }
}

module.exports = Todo;
