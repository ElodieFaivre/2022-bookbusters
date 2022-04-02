const client = require('../config/database');

/**
 * @typedef {object} User
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} email
 * @property {point} location
 * @property {number} avatar_id
 */

/**
 * @typedef {object} Book
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} ISBN13
 * @property {string} ISBN13_formatted
 * @property {string} ISBN10
 * @property {string} ISBN10_formatted
 * @property {[User]} user - user who offer this book
 */

/**
 * @typedef {object} InputBook
 * @property {string} ISBN13
 * @property {string} ISBN13_formatted
 * @property {string} ISBN10
 * @property {string} ISBN10_formatted
 */

const bookDataMapper = {

    async findAllInDonation() {
        const result = await client.query('SELECT * FROM book_in_donation');
        return result.rows;
    },

    async findOneBookById(bookId) {
        const result = await client.query('SELECT * FROM book_in_donation WHERE id = $1', [
            bookId,
        ]);
        return result.rows[0];
    },

    /**
     * Ajoute dans la base de données
     * @param {InputBook} book - Les données à insérer
     * @returns {Book} - Le livre ajouté
     */
    async insert(book) {
        const savedBook = await client.query(
            `
            INSERT INTO book
            ("ISBN13", "ISBN13_formatted", "ISBN10", "ISBN10_formatted" ) VALUES
            ($1, $2, $3, $4) RETURNING *
        `,
            [book.ISBN13, book.ISBN13_formatted, book.ISBN10, book.ISBN10_formatted],
        );

        return savedBook.rows[0];
    },
};

module.exports = bookDataMapper;
