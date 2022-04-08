const fetch = require('node-fetch');

const openLibrary = {
    async findBookCoverByISBN(isbn) {
        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`;
        const response = await fetch(url);
        const json = await response.json();

        let result = {};

        // If no answer
        if (Object.entries(json).length === 0) {
            result = undefined;
        }

        // If at least one answer
        if (Object.entries(json).length >= 1) {
            const ISBNKey = `ISBN:${isbn}`;

            // If no cover found in result
            if (!json[ISBNKey].thumbnail_url) {
                result = undefined;
            } else {
                result = {
                    isbnOL: json[ISBNKey].bib_key.split('ISBN:')[1], // ISBN:9782330113551
                    coverOL: json[ISBNKey].thumbnail_url.split('-S').join('-M'),
                    // coverL: json[ISBNKey].thumbnail_url.split('-S').join('-L'),
                };
            }
        }
        return result;
    },
};

module.exports = openLibrary;
