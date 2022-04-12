const cron = require('node-cron');
const userListsDataMapper = require('../models/userLists');
const { getBookInformation } = require('../middlewares/getBookInformation');
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
            return res.json('{ no book in library }');
        }

        const books = await getBookInformation(library.books);
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
            return res.json('{ no book in favorite }');
        }

        const books = await getBookInformation(favorites.books);
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
            return res.json('{ no book in alert }');
        }

        const books = await getBookInformation(alerts.books);
        alerts.books = books;

        return res.json(alerts);
    },
    async updateDonationDate(req, res) {
        const userId = Number(req.params.user_id);
        const bookId = Number(req.params.book_id);

        const updatedBook = await userListsDataMapper.updateDonationDate(userId, bookId);
        if (!updatedBook) {
            return res.json('{ no donation date updated }');
        };
        const book = await bookDataMapper.findOneBookById(bookId);
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
