/* eslint-disable no-useless-catch */
// const debug = require('debug')('openLibraryAPI')

const fetch = require('node-fetch');
const xml2js = require('xml2js')

const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: false, mergeAttrs: true, explicitArray: false })
/**
 * @typedef {object} BookCover
 * @property {string} cover - Book cover url
 */

const worldCat = {
    async findBookByISBN(isbn) {
        try {
            console.log('Je suis là');
            const url = `http://classify.oclc.org/classify2/Classify?isbn=${isbn}&summary=true`;
            const response = await fetch(url);
            const content = await response.text();
            const data = await parser.parseStringPromise(content);
            let result = {};
            if (data.classify.works) {
                const books = data.classify.works.work;
                const APIIsbn = data.classify.input._;
                console.log(APIIsbn);
                const regex1 = new RegExp(/^97[8-9]\d{10}$/);
                const regex2 = new RegExp(/^97[8-9]\d{7}$/);
                let isbn13 = null;
                let isbn10 = null;
                if (regex1.test(APIIsbn)) {
                    isbn13 = APIIsbn;
                }
                if (regex2.test(APIIsbn)) {
                    isbn10 = APIIsbn;
                }
                console.log(isbn13);
                console.log("books", books);

                for (const book of books) {
                    if (book.format == 'Book') {
                        result = {
                            isbn13: isbn13,
                            isbn10: isbn10,
                            title: book.title,
                            author: book.author,
                            publishedDate: book.lyr,
                        };
                        return result;
                    }
                };
            }
            else {
                result = undefined;
                return result;
            }
        }
        catch (error) {
            throw error;
        }
    },
};

module.exports = worldCat;
