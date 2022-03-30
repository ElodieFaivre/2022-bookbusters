const bookDataMapper = require('../models/book');
const ApiError = require('../errors/apiError');

module.exports = {
    /**
     * Product controller to get all books.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAll(req, res) {
        const books = await bookDataMapper.findAll();
        return res.json(books);


    },

    async getOneBookById(req, res) {
        const bookId = req.params.id;
        const book = await bookDataMapper.findOneBookById(bookId);
        if (!book) {
            throw ApiError('Book not found', 404)
        }
        return res.json(book);
    },
};