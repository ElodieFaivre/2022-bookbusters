const client = require('../config/database');
const { ApiError } = require('../middlewares/handleError');
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
 * @property {number} userId (via Token)
 * @property {boolean} is_in_library
 * @property {boolean} is_in_donation
 * @property {boolean} is_in_favorite
 * @property {boolean} is_in_alert
 */

/**
 * @typedef {object} InputAroundMe
 * @property {string} location (Format (x,y))
 * @property {integer} radius Radius to look around in km
 */

/**
 * @typedef {object} BookIdsAroundMe
 * @property {[integer]} number_of_books_found
 * @property {[integer]} book_ids
 * @property {string} location
 */



const bookDataMapper = {
    async findBooks(
        userId = 0,
        booksIds = '{}',
        booksISBN13s = '{}',
        booksISBN10s = '{}',
        limit = 10,
        page = 0
    ) {
        const result = await client.query(
            'SELECT * FROM get_book($1, $2, $3, $4, $5, $6);',
            [userId, booksIds, booksISBN13s, booksISBN10s, limit, page],
        );
        return result.rows;
    },

    async findBooksInDonation(
        userId = 0,
        booksIds = '{}',
        booksISBN13s = '{}',
        booksISBN10s = '{}',
        limit = 10,
        page = 0
    ) {
        const result = await client.query(
            'SELECT * FROM get_book($1, $2, $3, $4, $5, $6) WHERE number_of_donors > 0 ORDER BY last_donation_date DESC;',
            [userId, booksIds, booksISBN13s, booksISBN10s, limit, page]
        );
        return result.rows;
    },

    async findAllInDonation() {
        const result = await client.query('SELECT * FROM book_in_donation');
        return result.rows;
    },

    async findOneBookInDonationById(bookId) {
        const result = await client.query('SELECT * FROM book_in_donation WHERE id = $1', [bookId]);
        return result.rows[0];
    },

    async findOneBookById(bookId) {
        const result = await client.query(
            `SELECT book.*, MAX(donator.donation_date) AS donation_date, json_agg(to_jsonb("user".*)-'bio'-'password'-'mail_alert'-'mail_donation') as "user" FROM book
        LEFT JOIN (SELECT * FROM "user_has_book" WHERE user_has_book.is_in_donation=TRUE) AS donator ON book.id=donator.book_id
        LEFT JOIN "user" ON "user".id = donator.user_id WHERE book.id=$1 GROUP BY book.id;`,
            [bookId],
        );
        return result.rows[0];
    },

    async findOneBookByIsbn13(bookIsbn) {
        const result = await client.query(
            `SELECT book.*, MAX(donator.donation_date) AS donation_date, json_agg(to_jsonb("user".*)-'bio'-'password'-'mail_alert'-'mail_donation') as "user" FROM book
        LEFT JOIN (SELECT * FROM "user_has_book" WHERE user_has_book.is_in_donation=TRUE) AS donator ON book.id=donator.book_id
        LEFT JOIN "user" ON "user".id = donator.user_id WHERE book.isbn13=$1 GROUP BY book.id;`,
            [bookIsbn],
        );
        return result.rows[0];
    },

    async findOneBookByIsbn10(bookIsbn) {
        const result = await client.query(
            `SELECT book.*, MAX(donator.donation_date) AS donation_date, json_agg(to_jsonb("user".*)-'bio'-'password'-'mail_alert'-'mail_donation') as "user" FROM book
        LEFT JOIN (SELECT * FROM "user_has_book" WHERE user_has_book.is_in_donation=TRUE) AS donator ON book.id=donator.book_id
        LEFT JOIN "user" ON "user".id = donator.user_id WHERE book.isbn10=$1GROUP BY book.id;`,
            [bookIsbn],
        );
        return result.rows[0];
    },

    async findRelationBookUserWithBookId(bookId, userId) {
        const result = await client.query(
            `SELECT is_in_donation, is_in_library, is_in_favorite, is_in_alert FROM user_has_book WHERE book_id=$1 AND user_id=$2`,
            [bookId, userId],
        );
        return result.rows[0];
    },

    async findRelationBookUserWithISBN13(bookISBN, userId) {
        const result = await client.query(
            `SELECT is_in_donation, is_in_library, is_in_favorite, is_in_alert FROM user_has_book WHERE book_id=(SELECT id FROM book WHERE isbn13=$1) AND user_id=$2`,
            [bookISBN, userId],
        );
        return result.rows[0];
    },

    async findRelationBookUserWithISBN10(bookISBN, userId) {
        const result = await client.query(
            `SELECT is_in_donation, is_in_library, is_in_favorite, is_in_alert FROM user_has_book WHERE book_id=(SELECT id FROM book WHERE isbn10=$1) AND user_id=$2`,
            [bookISBN, userId],
        );
        return result.rows[0];
    },

    async insert(book) {
        const result = await client.query(
            ` INSERT INTO book
            (isbn13, isbn10) VALUES
            ($1, $2) RETURNING *
        `,
            [book.isbn13, book.isbn10],
        );
        return result.rows[0];
    },

    /**
     * Ajoute ou modifier dans la base de données
     * @param {InputBook} book - Les données à insérer
     * @returns {Book} - Le livre ajouté
     */
    async updateOrInsert(book) {
        //0. Check input body and update default values :
        //  - If is_in_library= TRUE, is_in_donation= TRUE.
        //  - If is_in_donation = TRUE, is_in_library = TRUE
        //  - If is_in_library= FALSE, is_in_donation= FALSE
        //  - If is_in_alert = TRUE, check if is_in_library = TRUE and error if it is (see later)
        if (book.is_in_library) {
            book.is_in_donation = true;
        }
        if (book.is_in_donation) {
            book.is_in_library = true;
        }
        if (!book.is_in_library) {
            book.is_in_donation = false;
        }

        //1. Verify if this book exist in our BDD
        let bookExist = await client.query(`SELECT id FROM book WHERE isbn13=$1 OR isbn10=$2`, [
            book.isbn13,
            book.isbn10,
        ]);

        let bookId = null;
        let userBookRelation = null;
        let userBook = null;
        // 2. If book exist, verify if relation exist
        if (bookExist.rowCount > 0) {
            bookId = bookExist.rows[0].id;
            debug('le livre existe avec id', bookId);
            userBookRelation = await client.query(
                `SELECT * FROM user_has_book WHERE book_id=$1 AND user_id=$2`,
                [bookId, book.userId],
            );
        }

        //3. If book does not exist yet, add book
        else {
            debug('le livre n existe pas, je vais le créer');
            const bookInserted = await this.insert(book);
            bookId = bookInserted.id;
            debug('livre créé avec id', bookId);
        }

        //4. If relation exist, update
        if (userBookRelation && userBookRelation.rowCount > 0) {
            debug('la relation de ce livre avec user existe déjà, update');
            debug('user id', userBookRelation.rows[0].id);
            //Check
            //  - If is_in_alert = TRUE, check if is_in_library = TRUE and error if it is (see later)
            if (book.is_in_alert) {
                if (userBookRelation.rows[0].is_in_library) {
                    throw new ApiError('Book already in library cannot be in alert', {
                        statusCode: 400,
                    });
                }
            }
            //if book_in_donation, update donation_date
            if (book.is_in_donation) {
                userBook = await client.query(
                    ` UPDATE user_has_book SET
                    "is_in_library"=$1, "is_in_donation"=$2, "is_in_favorite"=$3, "is_in_alert"=$4, "donation_date"=NOW() WHERE id=$5 RETURNING *
                `,
                    [
                        book.is_in_library,
                        book.is_in_donation,
                        book.is_in_favorite,
                        book.is_in_alert,
                        userBookRelation.rows[0].id,
                    ],
                );
            } else {
                userBook = await client.query(
                    ` UPDATE user_has_book SET
                    "is_in_library"=$1, "is_in_donation"=$2, "is_in_favorite"=$3, "is_in_alert"=$4 WHERE id=$5 RETURNING *
                `,
                    [
                        book.is_in_library,
                        book.is_in_donation,
                        book.is_in_favorite,
                        book.is_in_alert,
                        userBookRelation.rows[0].id,
                    ],
                );
            }

            debug('update terminé');
        }

        //5. else create
        else {
            debug('la relation de ce livre avec user n existe pas, je créé');
            debug('bookId', bookId);
            if (book.is_in_donation) {
                userBook = await client.query(
                    ` INSERT INTO user_has_book
                    (book_id, user_id, is_in_library, is_in_donation, is_in_favorite, is_in_alert, donation_date) VALUES
                    ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *
                `,
                    [
                        bookId,
                        book.userId,
                        book.is_in_library,
                        book.is_in_donation,
                        book.is_in_favorite,
                        book.is_in_alert,
                    ],
                );
            } else {
                userBook = await client.query(
                    ` INSERT INTO user_has_book
                    (book_id, user_id, is_in_library, is_in_donation, is_in_favorite, is_in_alert) VALUES
                    ($1, $2, $3, $4, $5, $6) RETURNING *
                `,
                    [
                        bookId,
                        book.userId,
                        book.is_in_library,
                        book.is_in_donation,
                        book.is_in_favorite,
                        book.is_in_alert,
                    ],
                );
            }

            debug('creation terminé');
        }
        debug('livre user-book MAJ', userBook.rows);

        //6. Then return book with status
        return userBook.rows[0];
    },

    async findBooksIdAround(point, radius) {
        const result = await client.query(`SELECT * FROM around_me($1::point, $2)`, [
            point,
            radius,
        ]);
        debug(result.rows);
        return result.rows;
    },
};

module.exports = bookDataMapper;
