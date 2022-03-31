const bookDataMapper = require('../models/book');
const ApiError = require('../errors/apiError');

module.exports = {
    /**
     * Product controller to get all books in donation.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAllInDonation(req, res) {
        const books = await bookDataMapper.findAllInDonation();
        return res.json(books);
    },

    async getOneBookById(req, res) {
        const bookId = req.params.id;
        const book = await bookDataMapper.findOneBookById(bookId);
        if (!book) {
            throw new ApiError('Book not found', 404);
        }
        return res.json(book);
    },

    /**
     * Book controller to add a book
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async addBook(req, res) {
        const savedBook = await bookDataMapper.insert(req.body);
        return res.json(savedBook);
    },
};
