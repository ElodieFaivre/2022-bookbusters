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
        if (req.body.userId) {
            const user_has_book = await bookDataMapper.findRelationBookUser(bookId, req.body.userId);
            debug(user_has_book);
            book = { ...book, ...user_has_book }
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
        debug('SAVED', savedUserHasBook);
        book = {
            ...book,
            is_in_library: savedUserHasBook.is_in_library,
            is_in_donation: savedUserHasBook.is_in_donation,
            is_in_alert: savedUserHasBook.is_in_alert,
            is_in_favorite: savedUserHasBook.is_in_favorite
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
    },

    async getDetailsBookAroundMe(req, res) {
        debug('Req.query.books = ', req.query.books);
        let bookIds = req.query.books
        bookIds = bookIds.substr(1).substr(0, bookIds.length - 2).split(',');
        debug('après traitement', bookIds);

        const promiseToSolve = [];
        bookIds.forEach(element => {
            promiseToSolve.push(bookDataMapper.findOneBookById(Number(element)));
        });


        //TODO : question : what happened si une promesse échoue ??
        debug('Je lance les promesses pour trouver les livres')
        let books = await Promise.all(promiseToSolve);
        books = await bookMW.getBookInformation(books);
        debug('Les livres trouvés sont', books);

        const getRelationPromise = [];
        req.body.userId=3;
        if (req.body.userId) {
            debug('user connecté')
            books.forEach(element => {
                getRelationPromise.push(bookDataMapper.findRelationBookUser(element.id, req.body.userId));
            })
            debug('Je vais chercher les relations avec le user connecté')
            const moreInfoBook = await Promise.all(getRelationPromise);

            for (let i = 0; i < books.length; i += 1) {
                books[i] = { ...books[i], ...moreInfoBook[i]};
            }

        }
       return res.json(books);

    }
};
