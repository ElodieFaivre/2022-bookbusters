const fetch = require('node-fetch');

/**
 * @typedef {object} BookInfo
 * @property {string} title - Book title
 * @property {[string]} author - Book authors
 * @property {string} resume - Book sum up
 * @property {string} publishedDate
 * @property {string} language
 */

const google ={
    async findBookByISBN(isbn) {
        try {
            const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
            const response = await fetch(url);
            const json = await response.json();

            let result={};

            //If no answer
            if(json.totalItems==0){
                result = undefined;
            }

            //If at least one answer
            if(json.totalItems>=1){
                result = {
                    title:json.items[0].volumeInfo.title,
                    author:json.items[0].volumeInfo.authors,
                    resume:json.items[0].volumeInfo.description,
                    publishedDate:json.items[0].volumeInfo.publishedDate,
                    language:json.items[0].volumeInfo.language
                };
            }


            return result;


        } catch (error) {
            throw error;
        }
    },
};

module.exports = google;
