const debug = require('debug')('bookFormatter');

const google = require('./google');
const openLibrary = require('./openLibrary');
const bookDataMapper = require('../models/book');

const bookReformatter = {
    /**
     * Regroup all books' information from a search in GoogleBooks API.
     * @param {[Book]} books Array of book in BDD
     */
    async reformat(books) {
        // Test to know where books come from
        if (books[0].title) {
            // books has titles, so they come from a Google result's research
            return await bookReformatter.completeWithDatabaseData(books);
        } else {
            // books hasn't titles, so they comme from our database
            return await bookReformatter.completeWithAPIsData(books);
        }
    },

    /**
     * Complete books' informations with BookBusters' data
     * @param {[Book]} books Array of book in BDD
     */
    async completeWithDatabaseData(books) {
        const openLibraryQueries = [];
        const bookInBDDQueries = [];

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

        // Promise Array of OpenLibrary Cover
        const openLibResult = await Promise.all(openLibraryQueries);

        // Promise Array of book in BookBusters BDD
        const booksInBDDResult = await Promise.all(bookInBDDQueries);

        // Group all books' info between APIs and Database
        books = books.map((book) => {
            booksInBDDResult.find((bookInBDD) => {
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
     * Complete books' informations with APIs' data
     * @param {[Book]} books Array of book in BDD
     */
    async completeWithAPIsData(books) {
        const googleQueries = [];
        const openLibraryQueries = [];

        books.forEach((book) => {
            if (book.isbn13) {
                googleQueries.push(google.findBookByISBN(book.isbn13));
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn13));
            } else if (book.isbn10) {
                googleQueries.push(google.findBookByISBN(book.isbn10));
                openLibraryQueries.push(openLibrary.findBookCoverByISBN(book.isbn10));
            }
        });

        // Promise Array of book in GoogleBooks
        const booksInGoogleResult = await Promise.all(googleQueries);

        // Promise Array of OpenLibrary Cover
        const openLibResult = await Promise.all(openLibraryQueries);

        // Group all books' info between APIs and Database
        books = books.map((book) => {
            booksInGoogleResult.find((bookInGoogle) => {
                if (
                    bookInGoogle &&
                    (bookInGoogle.isbn13 === book.isbn13 || bookInGoogle.isbn10 === book.isbn10)
                ) {
                    book = {
                        ...bookInGoogle,
                        ...book,
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
};

module.exports = bookReformatter;
