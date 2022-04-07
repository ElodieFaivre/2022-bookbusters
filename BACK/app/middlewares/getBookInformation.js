const google = require('../services/google');
const openLib = require('../services/openLibrary');
const bookDataMapper = require('../models/book');
const debug = require('debug')('getBookInfo');

module.exports = {
    /**
     * Book middleware to get all books information.
     * @param {[Book]} books Array of book in BDD
     */
    async getBookInformation(books, userId) {
        const googleQueries = [];
        const openLibraryQueries = [];
        const userBookRelationQueries = [];


        books.forEach((book) => {
            if(book.isbn13){
                googleQueries.push(google.findBookByISBN(book.isbn13));
                openLibraryQueries.push(openLib.findBookCoverByISBN(book.isbn13));
                if(userId){
                    debug('ajout relation');
                    userBookRelationQueries.push(bookDataMapper.findRelationBookUserWithISBN13(book.isbn13, userId))
                }
            }
            else if(book.isbn10)
            {
                googleQueries.push(google.findBookByISBN(book.isbn10));
                openLibraryQueries.push(openLib.findBookCoverByISBN(book.isbn10));
                if(userId){
                    debug('ajout relation');
                    userBookRelationQueries.push(bookDataMapper.findRelationBookUserWithISBN10(book.isbn10, userId))
                }
            }



        });

        const googleResult = await Promise.all(googleQueries);
        const openLibResult = await Promise.all(openLibraryQueries);
        const userBookRelationResult = await Promise.all(userBookRelationQueries);

        const newBooks = [];
        for (let i = 0; i < books.length; i += 1) {
            newBooks.push({ ...books[i], ...googleResult[i], ...openLibResult[i], ...userBookRelationResult[i] });
        }

        return newBooks;
    },
};
