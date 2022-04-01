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
    async findAllBooksInLibrary() {
        const result = await client.query('SELECT * FROM book_in_donation');
        return result.rows;
    },
};

module.exports = userListsDataMapper;
