const google = require('../services/google');
const openLibrary = require('../services/openLibrary');
const { ApiError } = require('../middlewares/handleError');
const bookDataMapper = require('../models/book');
const { getBookInformation } = require('../middlewares/getBookInformation');
const debug = require('debug')('apiController');

module.exports = {
    /**
     * @typedef {object} BookInfo
     * @property {string} isbn13 - Book isbn13
     * @property {string} isbn10 - Book isbn10
     * @property {string} title - Book title
     * @property {[string]} author - Book authors
     * @property {string} resume - Book sum up
     * @property {string} publishedDate
     * @property {string} language
     * @property {string} coverM - Book medium sized cover URL
     * @property {string} coverL - Book large sized cover URL
     */
    async getBookByISBN(req, res) {

        //Test if this ISBN is in our BDD
        let book = await bookDataMapper.findOneBookByIsbn13(req.params.isbn)
        if (!book) {
            book = await bookDataMapper.findOneBookByIsbn10(req.params.isbn)
        }
        if (book) {
            debug('livre déjà dans notre bdd')
            //this book exit in our BDD
            if (req.body.user) {
                debug('user connecté', req.body.user.userId)
                book = await getBookInformation([book], req.body.user.userId)
            }
            else {

                debug('user non connecté')
                book = await getBookInformation([book])
            }
        }
        else {
            //If not in our BDD, search
            debug('livre pas encore dans notre bdd')
            const book = await google.findBookByISBN(req.params.isbn);
            if (!book) {
                throw new ApiError('Sorry, book with this ISBN not found', { statusCode: 204 });
            }

            // Search for a cover to add to the book found
            const cover = await openLibrary.findBookCoverByISBN(req.params.isbn);
            if (cover) {
                book.coverM = cover.coverM;
                book.coverL = cover.coverL;
            }

        }
        return res.json(book);
    },

    async getBookCoverByISBN(req, res) {
        const cover = await openLibrary.findBookCoverByISBN(req.params.isbn);
        if (!cover) {
            throw new ApiError('Sorry, book cover with this ISBN not found', { statusCode: 204 });
        }
        return res.json(cover);
    },

    async getBookByKeyword(req, res) {
        let books = await google.findBookByKeyword(req.query.q);
        if (!books) {
            throw new ApiError('Sorry, book with this keyword not found', { statusCode: 204 });
        }

        const openLibraryQueries = [];
        const bookInBDDQueries = [];
        const userBookRelationQueries= [];

        books.forEach((book) => {
            if (book.isbn13) {

                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn13));
                bookInBDDQueries.push(bookDataMapper.findOneBookByIsbn13(book.isbn13));
            }
            else if (book.isbn10) {
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn10));
                bookInBDDQueries.push(bookDataMapper.findOneBookByIsbn10(book.isbn10));
            }

        });

        const openLibResult = await Promise.all(openLibraryQueries);
        const bookInBDDResult = await Promise.all(bookInBDDQueries);

        //debug('BOOK IN BDD RESULT', bookInBDDResult)
        for (let i = 0; i < books.length; i += 1) {
            if (bookInBDDResult[i]) {
                //debug('livre trouvé avec id', bookInBDDResult[i].id)
                if (bookInBDDResult[i].isbn13) {
                    if (req.body.user) {
                        debug('ajout relation');
                        userBookRelationQueries.push(bookDataMapper.findRelationBookUserWithISBN13(bookInBDDResult[i].isbn13, req.body.user.userId))
                    }
                }
                else if (bookInBDDResult[i].isbn10) {
                    if (req.body.user) {
                        debug('ajout relation');
                        userBookRelationQueries.push(bookDataMapper.findRelationBookUserWithISBN10(bookInBDDResult[i].isbn10, req.body.user.userId))
                    }
                }
            }
        }

        const userBookRelationResult = await Promise.all(userBookRelationQueries);

        for (let i = 0; i < books.length; i += 1) {
            debug('BOOK IN BDD RESULT i', bookInBDDResult[i])
            books[i] = { ...books[i], ...openLibResult[i], ...bookInBDDResult[i], ...userBookRelationResult[i] };
        }

        return res.json(books);
    },
};
