const client = require('../config/database');
const debug = require('debug')('BookController');
/**
 * @typedef {object} User
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} email
 * @property {string} location
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
 * @property {string} isbn13
 * @property {string} isbn10
 * @property {number} user_id
 * @property {boolean} is_in_library
 * @property {boolean} is_in_donation
 * @property {boolean} is_in_favorite
 * @property {boolean} is_in_alert
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
     * Ajoute ou modifier dans la base de données
     * @param {InputBook} book - Les données à insérer
     * @returns {Book} - Le livre ajouté
     */
    async updateOrInsert(book) {
        //1. Verify if this book exist in our BDD
        let bookId = await client.query(
            `SELECT id FROM book WHERE isbn13=$1 OR isbn10=$2`,
            [book.isbn13, book.isbn10],
        );


        //TODO : user id dynamic
        let userBookRelation=null;
        let userBook=null;
        // 2. If book exist, verify if relation exist
        if(bookId.rowCount>0){
            debug('le livre existe')
            bookId=bookId.rows[0].id;
            debug('le livre existe avec id', bookId)
            userBookRelation =await client.query(
                `SELECT * FROM user_has_book WHERE book_id=$1 AND user_id=$2`,
                [bookId, book.user_id],
            );
        }

        //2. If book does not exist yet, add book
       else {
            debug('le livre n existe pas, je vais le créer')
            bookId = await client.query(
                ` INSERT INTO book
                (isbn13, isbn10) VALUES
                ($1, $2) RETURNING id
            `,
                [book.isbn13, book.isbn10],
            );
            bookId=bookId.rows[0].id;
            debug('livre créé avec id', bookId);
        }
        //3. If relation exist, update
        if(userBookRelation && userBookRelation.rowCount>0){
            debug('la relation de ce livre avec user existe déjà, update')
            debug("user id", userBookRelation.rows[0].id)
            userBook = await client.query(
                ` UPDATE user_has_book SET
                "is_in_library"=$1, "is_in_donation"=$2, "is_in_favorite"=$3, "is_in_alert"=$4 WHERE id=$5 RETURNING *
            `,
                [book.is_in_library, book.is_in_donation, book.is_in_favorite, book.is_in_alert, userBookRelation.rows[0].id],
            );
            debug('update terminé')
        }
        //4 else create
        else {
            debug('la relation de ce livre avec user existe pas, je créé')
            debug('bookId', bookId)
           userBook = await client.query(
                ` INSERT INTO user_has_book
                (book_id, user_id, is_in_library, is_in_donation, is_in_favorite, is_in_alert) VALUES
                ($1, $2, $3, $4, $5, $6) RETURNING *
            `,
                [bookId, book.user_id, book.is_in_library, book.is_in_donation, book.is_in_favorite, book.is_in_alert],
            );
            debug('creation terminé')
        }
        debug('livre user-book MAJ', userBook.rows)
        //6 Then return book with status
        return userBook.rows[0];
    },
};

module.exports = bookDataMapper;
