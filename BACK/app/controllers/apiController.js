const google = require('../services/google');
const ApiError = require('../errors/apiError');

module.exports = {
    async getBookByISBN(req, res) {
        const book = await google.findBookByISBN(req.params.isbn);
        if (!book){
            throw new ApiError('Sorry, book with this ISBN not found', 404);
        }
        return res.json(book);
    }
};
