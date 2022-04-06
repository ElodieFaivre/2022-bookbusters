const bookDataMapper = require('../models/book');
const { ApiError } = require('../middlewares/handleError');
const bookMW = require('../middlewares/getBookInformation');
const debug = require('debug')('bookController');

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
            throw new ApiError('Book not found', { statusCode: 404 });
        }
        book = await bookMW.getBookInformation([book]);
        if(req.body.userId){
            const user_has_book = await bookDataMapper.findRelationBookUser(bookId,req.body.userId);
            debug(user_has_book);
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

        //const user_has_book = await bookDataMapper.findRelationBookUser(book.id,req.body.userId);
        debug('SAVED',savedUserHasBook);
        book = {
            ...book,
            is_in_library :savedUserHasBook.is_in_library,
            is_in_donation :savedUserHasBook.is_in_donation,
            is_in_alert :savedUserHasBook.is_in_alert,
            is_in_favorite :savedUserHasBook.is_in_favorite
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
    async getBooksIdsAroundMe(req, res) {
        const books = await bookDataMapper.findBooksIdAround(req.body.location, req.body.radius);
        return res.json(books);
    }
};
