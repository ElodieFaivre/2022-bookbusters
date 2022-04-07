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
        const books = await google.findBookByKeyword(req.query.q);
        if (!books) {
            throw new ApiError('Sorry, book with this keyword not found', { statusCode: 204 });
        }
        const openLibraryQueries = [];

        books.forEach((book) => {
            openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn13));
        });

        const openLibResult = await Promise.all(openLibraryQueries);
        for (let i = 0; i < books.length; i += 1) {
            books[i] = { ...books[i], ...openLibResult[i] };
        }
        return res.json(books);
    },
};
