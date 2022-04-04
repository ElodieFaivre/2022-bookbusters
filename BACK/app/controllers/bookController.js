const bookDataMapper = require('../models/book');
const ApiError = require('../errors/apiError');
const bookMW = require('../middlewares/getBookInformation');

module.exports = {
    /**
     * Product controller to get all books in donation.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAllInDonation(req, res) {
        let books = await bookDataMapper.findAllInDonation();
        books = await bookMW.getBookInformation(books);
        return res.json(books);
    },

    async getOneBookById(req, res) {
        const bookId = req.params.id;
        let book = await bookDataMapper.findOneBookById(bookId);
        if (!book) {
            throw new ApiError('Book not found', 404);
        }
        book = await bookMW.getBookInformation([book]);
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
        const savedBook = await bookDataMapper.updateOrInsert(req.body);
        return res.json(savedBook);
    },
};
