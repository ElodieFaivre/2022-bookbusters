const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const userListsDataMapper = require('../models/userLists');
const bookReformatter = require('../services/bookReformatter');
const { ApiError } = require('../middlewares/handleError');
const bookDataMapper = require('../models/book');
const userDataMapper = require('../models/user');

module.exports = {
    /**
     * User controller to get all books in the user's library.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAllBooksInLibrary(req, res) {
        const RouteUserId = Number(req.params.id);
        const ConnectedUserId = Number(req.body.user.userId);

        if (ConnectedUserId !== RouteUserId) {
            throw new ApiError('Unauthorized access', { statusCode: 401 });
        }

        const library = await userListsDataMapper.findAllBooksInLibrary(RouteUserId);

        if (!library) {
            return res.json([]);
        }

        const books = await bookReformatter.reformat(library.books);
        library.books = books;

        return res.json(library);
    },

    /**
     * User controller to get all books in the user's favorites list.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAllBooksInFavorite(req, res) {
        const RouteUserId = Number(req.params.id);
        const ConnectedUserId = Number(req.body.user.userId);

        if (ConnectedUserId !== RouteUserId) {
            throw new ApiError('Unauthorized access', { statusCode: 401 });
        }

        const favorites = await userListsDataMapper.findAllBooksInFavorite(RouteUserId);

        if (!favorites) {
            return res.json([]);
        }

        const books = await bookReformatter.reformat(favorites.books);
        favorites.books = books;

        return res.json(favorites);
    },

    /**
     * User controller to get all books in the user's alerte list.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAllBooksInAlert(req, res) {
        const RouteUserId = Number(req.params.id);
        const ConnectedUserId = Number(req.body.user.userId);

        if (ConnectedUserId !== RouteUserId) {
            throw new ApiError('Unauthorized access', { statusCode: 401 });
        }

        const alerts = await userListsDataMapper.findAllBooksInAlert(RouteUserId);

        if (!alerts) {
            return res.json([]);
        }

        const books = await bookReformatter.reformat(alerts.books);
        alerts.books = books;

        return res.json(alerts);
    },
    async updateDonationDate(req, res) {
        const id = jwt.verify(req.params.token, process.env.SECRET_TOKEN_KEY);
        const userId1 = id.userId;
        const bookId1 = id.bookId;
        console.log(userId1, bookId1);
        const updatedBook = await userListsDataMapper.updateDonationDate(userId1, bookId1);
        if (!updatedBook) {
            return res.json('{ no donation date updated }');
        };
        const book = await bookDataMapper.findOneBookById(bookId1);
        return res.json({ book, association: updatedBook });
        
    },

};
// Service scheduled at 3 AM to find all the zombi books (ie relation book/user
// with donation date more than 210 days) and deletion of the link between the user and the book
cron.schedule('0 0 3 * *', async () => {
    const zombiBooks = await userDataMapper.findUsersWithZombiBooks();
    if (zombiBooks) {
        const promiseToSolve = [];
        zombiBooks.forEach(zombiBook => {
            promiseToSolve.push(userListsDataMapper.delete(zombiBook.book_id, zombiBook.user_id));
            return res.status(204).json();
        });
    }
});
