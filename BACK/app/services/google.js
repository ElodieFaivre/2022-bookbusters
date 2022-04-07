/* eslint-disable no-useless-catch */
/* eslint-disable eqeqeq */
/* eslint-disable spaced-comment */
const fetch = require('node-fetch');
const worldCat = require('../services/worldCat');

const google = {
    async findBookByISBN(isbn) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
        const response = await fetch(url);
        const json = await response.json();

        let result = {};

        //If no answer
        if (json.totalItems == 0) {
            result = undefined;
        }

<<<<<<< HEAD
            // eslint-disable-next-line spaced-comment
            //If at least one answer, only the first one is return
            if (json.totalItems >= 1) {
                let isbn13 = null;
                let isbn10 = null;
                if (json.items[0].volumeInfo.industryIdentifiers) {
                    if (json.items[0].volumeInfo.industryIdentifiers.length > 0) {
                        // eslint-disable-next-line arrow-parens
                        json.items[0].volumeInfo.industryIdentifiers.forEach(identifier => {
                            if (identifier.type === "ISBN_13") {
                                isbn13 = identifier.identifier;
                            }
                            if (identifier.type === "ISBN_10") {
                                isbn10 = identifier.identifier;
                            }
                        })
                    }
=======
        //If at least one answer, only the first one is return
        if (json.totalItems >= 1) {
            let isbn13 = null;
            let isbn10 = null;
            if (json.items[0].volumeInfo.industryIdentifiers) {
                if (json.items[0].volumeInfo.industryIdentifiers.length > 0) {
                    json.items[0].volumeInfo.industryIdentifiers.forEach((identifier) => {
                        if (identifier.type === 'ISBN_13') {
                            isbn13 = identifier.identifier;
                        }
                        if (identifier.type === 'ISBN_10') {
                            isbn10 = identifier.identifier;
                        }
                    });
>>>>>>> dev
                }
            }
<<<<<<< HEAD
            else {
                result = await worldCat.findBookByISBN(isbn);
            }
            return result;
        } catch (error) {
            throw error;
=======
            result = {
                isbn13: isbn13,
                isbn10: isbn10,
                title: json.items[0].volumeInfo.title,
                author: json.items[0].volumeInfo.authors,
                resume: json.items[0].volumeInfo.description,
                publishedDate: json.items[0].volumeInfo.publishedDate,
                language: json.items[0].volumeInfo.language,
            };
>>>>>>> dev
        }

        return result;
    },

    async findBookByKeyword(word) {
        //TODO : modify maxResults and startIndex
        const url = `https://www.googleapis.com/books/v1/volumes?q="${word}"&orderBy=relevance&printType=books&maxResults=10&startIndex=0`;

<<<<<<< HEAD
            //If no answer
            if (json.totalItems == 0) {
                return result = undefined;
            }
            // else more than one answer
            json.items.forEach(item => {
                let isbn13 = null;
                let isbn10 = null;
                if (item.volumeInfo.industryIdentifiers) {
                    if (item.volumeInfo.industryIdentifiers.length > 0) {
                        item.volumeInfo.industryIdentifiers.forEach(identifier => {
                            if (identifier.type === "ISBN_13") {
                                isbn13 = identifier.identifier;
                            }
                            if (identifier.type === "ISBN_10") {
                                isbn10 = identifier.identifier;
                            }
                        })
                    }
                }
                if (isbn13 || isbn10) {
                    book = {
                        isbn13: isbn13,
                        isbn10: isbn10,
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors,
                        resume: item.volumeInfo.description,
                        publishedDate: item.volumeInfo.publishedDate,
                        language: item.volumeInfo.language
                    }
                    result.push(book);
                }
=======
        const response = await fetch(url);
        const json = await response.json();
>>>>>>> dev

        let result = [];

        //If no answer
        if (json.totalItems == 0) {
            return (result = undefined);
        }
        // else more than one answer
        json.items.forEach((item) => {
            let isbn13 = null;
            let isbn10 = null;
            if (item.volumeInfo.industryIdentifiers) {
                if (item.volumeInfo.industryIdentifiers.length > 0) {
                    item.volumeInfo.industryIdentifiers.forEach((identifier) => {
                        if (identifier.type === 'ISBN_13') {
                            isbn13 = identifier.identifier;
                        }
                        if (identifier.type === 'ISBN_10') {
                            isbn10 = identifier.identifier;
                        }
                    });
                }
            }
            if (isbn13 || isbn10) {
                book = {
                    isbn13: isbn13,
                    isbn10: isbn10,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors,
                    resume: item.volumeInfo.description,
                    publishedDate: item.volumeInfo.publishedDate,
                    language: item.volumeInfo.language,
                };
                result.push(book);
            }
        });

        return result;
    },
};

module.exports = google;
