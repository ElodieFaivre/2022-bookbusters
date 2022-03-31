const client = require('../config/database');

/**
 * @typedef {object} Book
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} ISBN13
 * @property {string} ISBN13_formatted
 * @property {string} ISBN10
 * @property {string} ISBN10_formatted
 */

const bookDataMapper = {
    async findAll() {
        const result = await client.query('SELECT * FROM book');
        return result.rows;
    },

    async findOneBookById(bookId) {
        const result = await client.query('SELECT * FROM book WHERE id = $1', [bookId]);
        return result.rows[0];
    },
};

module.exports = bookDataMapper;
