const google = require('../services/google');
const openLibrary = require('../services/openLibrary');
const ApiError = require('../errors/apiError');

module.exports = {
    /**
     * @typedef {object} BookInfo
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
            throw new ApiError('Sorry, book with this ISBN not found', 404);
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
            throw new ApiError('Sorry, book cover with this ISBN not found', 404);
        }
        return res.json(cover);
    },
};
