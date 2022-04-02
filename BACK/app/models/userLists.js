const client = require('../config/database');

/**
 * @typedef {object} UserLists - 3 lists and 1 status (library, favorite, alert, and donation)
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {number} user_id - user's unique database id
 * @property {point} book_id - book's unique database id
 * @property {boolean} is_in_libray - is the book in the user's library?
 * @property {boolean} is_in_donation - has the book a donation status ON by the user?
 * @property {boolean} is_in_favorite - is the book in the user's favorite list?
 * @property {boolean} is_in_alert - has the user put an alert on the book?
 * @property {string} donation_date - the date since when the book put in donation by the user
 */

const userListsDataMapper = {
    async findAllBooksInLibrary(userId) {
        const result = await client.query('SELECT * FROM user_book_in_library WHERE id = $1', [
            userId,
        ]);

        return result.rows[0];
    },

    async findAllBooksInFavorite(userId) {
        const result = await client.query('SELECT * FROM user_book_in_favorite WHERE id = $1', [
            userId,
        ]);

        return result.rows[0];
    },

    async findAllBooksInAlert(userId) {
        const result = await client.query('SELECT * FROM user_book_in_alert WHERE id = $1', [
            userId,
        ]);

        return result.rows[0];
    },
};

module.exports = userListsDataMapper;
