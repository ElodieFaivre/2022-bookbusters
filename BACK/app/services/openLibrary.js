const fetch = require('node-fetch');

/**
 * @typedef {object} BookCover
 * @property {string} cover - Book cover url
 */

const openLibrary = {
    async findBookCoverByISBN(isbn) {
        try {
            const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`;
            const response = await fetch(url);
            const json = await response.json();

            let result = {};

            // If no answer
            if (json.totalItems == 0) {
                result = undefined;
            }

            // If at least one answer
            if (json.totalItems >= 1) {
                const ISBNKey = `ISBN:${isbn}`;

                // If no cover found in result
                if (!(json.items[0][ISBNKey].thumbnail_url)) {
                    result = undefined;
                } else {
                    result = {
                        coverM: json.items[0][ISBNKey].thumbnail_url.split('-S').join('-M'),
                        coverL: json.items[0][ISBNKey].thumbnail_url.split('-S').join('-L'),
                    };
                }
            }
            
            return result;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = openLibrary;
