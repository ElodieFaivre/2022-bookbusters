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
        let book = await bookDataMapper.findOneBookByIsbn13(req.params.isbn);
        if (!book) {
            book = await bookDataMapper.findOneBookByIsbn10(req.params.isbn);
        }
        if (book) {
            debug('livre déjà dans notre bdd');
            //this book exit in our BDD
            book = await getBookInformation([book], req.body.user);
        } else {
            //If not in our BDD, search
            debug('livre pas encore dans notre bdd');
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
        const keyWords = req.query.q;
        const limit = req.query.limit || 10; // limitation du nombre de résultat auprès de GoogleBooks API
        const start = req.query.start || 0; // indication de l'index de démarrage souhaité auprès de GoogleBooks API

        let books = await google.findBookByKeyword(keyWords, limit, start);
        debug('Résultats de recherche GoogleBooks :\n', books);

        if (!books) {
            throw new ApiError('Sorry, book with this keyword not found', { statusCode: 204 });
        }

        const openLibraryQueries = [];
        const bookInBDDQueries = [];
        // const userBookRelationQueries = [];

        books.forEach((book) => {
            if (book.isbn13) {
                // if (!book.coverGoogle) {
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn13));
                // }
                bookInBDDQueries.push(bookDataMapper.findOneBookByIsbn13(book.isbn13));
            } else if (book.isbn10) {
                // if (!book.coverGoogle) {
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn10));
                // }
                bookInBDDQueries.push(bookDataMapper.findOneBookByIsbn10(book.isbn10));
            }
        });

        // Promise Array of OpenLib Cover
        const openLibResult = await Promise.all(openLibraryQueries);

        // Promise Array of book in BookBusters BDD
        const bookInBDDResult = await Promise.all(bookInBDDQueries);

        // Group all books' info between APIs and Database
        books = books.map((book) => {
            bookInBDDResult.find((bookInBDD) => {
                if (
                    bookInBDD &&
                    (bookInBDD.isbn13 === book.isbn13 || bookInBDD.isbn10 === book.isbn10)
                ) {
                    book = {
                        ...book,
                        ...bookInBDD,
                    };
                }
            });

            openLibResult.find((cover) => {
                if (cover && (cover.isbnOL === book.isbn13 || cover.isbnOL === book.isbn10)) {
                    book.coverOL = cover.coverOL;
                }
            });

            return book;
        });

        return res.json(books);
    },
};
