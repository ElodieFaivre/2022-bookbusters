const userListsDataMapper = require('../models/userLists');
const { getBookInformation } = require('../middlewares/getBookInformation');
const { ApiError } = require('../middlewares/handleError');

module.exports = {
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
};
