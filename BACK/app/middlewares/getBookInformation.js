const google = require('../services/google');
const openLib = require('../services/openLibrary');

module.exports = {
    /**
     * Book middleware to get all books information.
     * @param {[Book]} books Array of book in BDD
     */
    async getBookInformation(books) {
        const googleQueries = [];
        const openLibraryQueries = [];

        books.forEach((book) => {
            googleQueries.push(google.findBookByISBN(book.isbn13));
            openLibraryQueries.push(openLib.findBookCoverByISBN(book.isbn13));
        });

        const googleResult = await Promise.all(googleQueries);
        const openLibResult = await Promise.all(openLibraryQueries);

        const newBooks = [];
        for (let i = 0; i < books.length; i += 1) {
            newBooks.push({ ...books[i], ...googleResult[i], ...openLibResult[i] });
        }

        return newBooks;
    },
};
