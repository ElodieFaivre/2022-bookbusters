const userListsDataMapper = require('../models/userLists');
const { getBookInformation } = require('../middlewares/getBookInformation');
// const ApiError = require('../errors/apiError');

module.exports = {
    async getAllBooksInLibrary(req, res) {
        const userId = Number(req.params.id);
        const library = await userListsDataMapper.findAllBooksInLibrary(userId);

        if (!library) {
            return res.json('{ no book in library }');
        }

        const books = await getBookInformation(library.books);
        library.books = books;

        return res.json(library);
    },

    async getAllBooksInFavorite(req, res) {
        const userId = Number(req.params.id);
        const favorites = await userListsDataMapper.findAllBooksInFavorite(userId);

        if (!favorites) {
            return res.json('{ no book in favorite }');
        }

        const books = await getBookInformation(favorites.books);
        favorites.books = books;

        return res.json(favorites);
    },

    async getAllBooksInAlert(req, res) {
        const userId = Number(req.params.id);
        const alerts = await userListsDataMapper.findAllBooksInAlert(userId);

        if (!alerts) {
            return res.json('{ no book in alert }');
        }

        const books = await getBookInformation(alerts.books);
        alerts.books = books;

        return res.json(alerts);
    },
};
