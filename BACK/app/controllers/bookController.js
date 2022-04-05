const bookDataMapper = require('../models/book');
const ApiError = require('../errors/apiError');
const bookMW = require('../middlewares/getBookInformation');
const { getBookCoverByISBN } = require('./apiController');

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
        let book = await bookDataMapper.findOneBookInDonationById(bookId);
        if (!book) {
            throw new ApiError('Book not found', 404);
        }
        book = await bookMW.getBookInformation([book]);
        if(req.body.userId){
            const user_has_book = await bookDataMapper.findRelationBookUser(bookId,req.body.userId);
            book = {...book, ...user_has_book }
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
        const savedUserHasBook = await bookDataMapper.updateOrInsert(req.body);
        let book = await bookDataMapper.findOneBookById(savedUserHasBook.book_id);
        book = await bookMW.getBookInformation([book]);
        return res.json(book);
    },
};
