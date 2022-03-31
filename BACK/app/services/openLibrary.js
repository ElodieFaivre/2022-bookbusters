const debug = require('debug')('openLibraryAPI')

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

            debug(json);

            let result = {};

            // If no answer
            if (Object.entries(json).length === 0) {
                result = undefined;
            }

            // If at least one answer
            if (Object.entries(json).length >= 1) {
                debug('1 resultat');
                const ISBNKey = `ISBN:${isbn}`;

                debug(ISBNKey);

                // If no cover found in result
                if (!(json[ISBNKey].thumbnail_url)) {
                    debug('pas de cover trouvée dans le résultat');
                    result = undefined;
                } else {
                    debug('cover trouvée dans le résultat');
                    result = {
                        coverM: json[ISBNKey].thumbnail_url.split('-S').join('-M'),
                        coverL: json[ISBNKey].thumbnail_url.split('-S').join('-L'),
                    };
                }
            }
            debug(result);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = openLibrary;
