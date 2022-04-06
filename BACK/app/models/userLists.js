const client = require('../config/database');

/**
 * @typedef {object} Books
 * @property {number} association_id - Indentifiant unique, Pk de la table user_has_book
 * @property {number} book_id - Indentifiant unique, Pk de la table book
 * @property {string} isbn13
 * @property {string} isbn10
 * @property {boolean} is_in_libray
 * @property {boolean} is_in_donation
 * @property {string} donation_date
 * @property {boolean} is_in_favorite
 * @property {boolean} is_in_alert
 */

/**
 * @typedef {object} UserLists
 * @property {number} user_id - Indentifiant unique, Pk de la table user
 * @property {string} book_count - Number of books in the list
 * @property {[Books]} books
 */

const userListsDataMapper = {
    async findAllBooksInLibrary(userId) {
        const result = await client.query('SELECT * FROM user_book_in_library WHERE user_id = $1', [
            userId,
        ]);

        return result.rows[0];
    },

    async findAllBooksInFavorite(userId) {
        const result = await client.query('SELECT * FROM user_book_in_favorite WHERE user_id = $1', [
            userId,
        ]);

        return result.rows[0];
    },

    async findAllBooksInAlert(userId) {
        const result = await client.query('SELECT * FROM user_book_in_alert WHERE user_id = $1', [
            userId,
        ]);

        return result.rows[0];
    },
};

module.exports = userListsDataMapper;
