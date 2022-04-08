const debug = require('debug')('bookFormatter');

const google = require('./google');
const openLibrary = require('./openLibrary');
const bookDataMapper = require('../models/book');

module.exports = {
    /**
     * Book formatter to get all books information.
     * @param {[Book]} books Array of book in BDD
     */
    async formatFromGoogleResult(books) {
        const openLibraryQueries = [];
        const bookInBDDQueries = [];
        // const userBookRelationQueries = [];

        books.forEach((book) => {
            if (book.isbn13) {
                // if (!book.coverGoogle) {
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn13));
                // }
                bookInBDDQueries.push(bookDataMapper.findOneBookByIsbn13(book.isbn13));
            } else if (book.isbn10) {
                // if (!book.coverGoogle) {
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn10));
                // }
                bookInBDDQueries.push(bookDataMapper.findOneBookByIsbn10(book.isbn10));
            }
        });

        // Promise Array of OpenLib Cover
        const openLibResult = await Promise.all(openLibraryQueries);

        // Promise Array of book in BookBusters BDD
        const bookInBDDResult = await Promise.all(bookInBDDQueries);

        // Group all books' info between APIs and Database
        books = books.map((book) => {
            bookInBDDResult.find((bookInBDD) => {
                if (
                    bookInBDD &&
                    (bookInBDD.isbn13 === book.isbn13 || bookInBDD.isbn10 === book.isbn10)
                ) {
                    book = {
                        ...book,
                        ...bookInBDD,
                    };
                }
            });

            openLibResult.find((cover) => {
                if (cover && (cover.isbnOL === book.isbn13 || cover.isbnOL === book.isbn10)) {
                    book.coverOL = cover.coverOL;
                }
            });

            return book;
        });

        return books;
    },

    /**
     * Book middleware to get all books information.
     * @param {[Book]} books Array of book in BDD
     */
    async formatFromBDDResult(books, user) {
        const googleQueries = [];
        const openLibraryQueries = [];
        const userBookRelationQueries = [];
        let userId = null;

        if (user) {
            userId = user.userId;
        }

        books.forEach((book) => {
            if (book.isbn13) {
                googleQueries.push(google.findBookByISBN(book.isbn13));
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn13));
                if (userId) {
                    debug('ajout relation');
                    userBookRelationQueries.push(
                        bookDataMapper.findRelationBookUserWithISBN13(book.isbn13, userId),
                    );
                }
            } else if (book.isbn10) {
                googleQueries.push(google.findBookByISBN(book.isbn10));
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn10));
                if (userId) {
                    debug('ajout relation');
                    userBookRelationQueries.push(
                        bookDataMapper.findRelationBookUserWithISBN10(book.isbn10, userId),
                    );
                }
            }
        });

        const googleResult = await Promise.all(googleQueries);
        const openLibResult = await Promise.all(openLibraryQueries);
        const userBookRelationResult = await Promise.all(userBookRelationQueries);

        const newBooks = [];
        for (let i = 0; i < books.length; i += 1) {
            newBooks.push({
                ...books[i],
                ...googleResult[i],
                ...openLibResult[i],
                ...userBookRelationResult[i],
            });
        }

        return newBooks;
    },
};
