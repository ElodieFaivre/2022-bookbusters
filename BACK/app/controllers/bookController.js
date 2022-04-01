const bookDataMapper = require('../models/book');
const ApiError = require('../errors/apiError');
const google = require('../services/google');
const openLib = require('../services/openLibrary');

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

        const googleQueries=[];
        const openLibraryQueries=[];
        books.forEach((book)=>{
            googleQueries.push(google.findBookByISBN(book.isbn13));
            openLibraryQueries.push(openLib.findBookCoverByISBN(book.isbn13))
        });

        const google_result = await Promise.all(googleQueries);
        const openLib_result = await Promise.all(openLibraryQueries);

        for (let i=0; i<books.length;i++){
            books[i]={...books[i],...google_result[i],...openLib_result[i]}
        }

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
