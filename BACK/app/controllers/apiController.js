const google = require('../services/google');
const openLibrary = require('../services/openLibrary');
const worldCat = require('../services/worldCat');
const { ApiError } = require('../middlewares/handleError');
const bookDataMapper = require('../models/book');
//const bookReformatter = require('../services/bookReformatter');
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
            //book = await bookReformatter.reformat([book], req.body.user);
        } else {
            //If not in our BDD, search
            debug('livre pas encore dans notre bdd');
            book = await google.findBookByISBN(req.params.isbn);

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

        //books = await bookReformatter.reformat(books);

        return res.json(books);
    },

    async getBookWithWorldCat(req, res) {
        const book = await worldCat.findBookByISBN(req.params.isbn);
        return res.json(book);
    },
};
