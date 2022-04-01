const userListsDataMapper = require('../models/userLists');
const ApiError = require('../errors/apiError');

module.exports = {
    async getAllBooksInLibrary(req, res) {
        const books = await userListsDataMapper.findAllBooksInLibrary();
        return res.json(books);
    },
};
