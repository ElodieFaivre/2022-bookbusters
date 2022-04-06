const google = require('../services/google');
const openLibrary = require('../services/openLibrary');
const worldCat = require('../services/worldCat');
const ApiError = require('../errors/apiError');

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
        const book = await google.findBookByISBN(req.params.isbn);
        if (!book) {
            throw new ApiError('Sorry, book with this ISBN not found', 204);
        }

        // Search for a cover to add to the book found
        const cover = await openLibrary.findBookCoverByISBN(req.params.isbn);
        if (cover) {
            book.coverM = cover.coverM;
            book.coverL = cover.coverL;
        }

        return res.json(book);
    },

    async getBookCoverByISBN(req, res) {
        const cover = await openLibrary.findBookCoverByISBN(req.params.isbn);
        if (!cover) {
            throw new ApiError('Sorry, book cover with this ISBN not found', 204);
        }
        return res.json(cover);
    },

    async getBookByKeyword(req, res) {
        const books = await google.findBookByKeyword(req.query.q);
        if (!books) {
            throw new ApiError('Sorry, book with this keyword not found', 204);
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

    async getBookWithWorldCat(req, res) {
        const book = await worldCat.findBookByISBN(req.params.isbn);
        if (!book) {
            throw new ApiError('Sorry, book with this ISBN not found', 204);
        }
        return res.json(book);
    },
};
