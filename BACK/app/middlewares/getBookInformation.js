const google = require('../services/google');
const openLib = require('../services/openLibrary');

module.exports={
     /**
     * Book middleware to get all books information.
     * @param {[Book]} books Array of book in BDD
     */
    async getBookInformation(books){

        const googleQueries=[];
        const openLibraryQueries=[];
        books.forEach((book)=>{
            googleQueries.push(google.findBookByISBN(book.isbn13));
            openLibraryQueries.push(openLib.findBookCoverByISBN(book.isbn13))
        });

        const google_result = await Promise.all(googleQueries);
        const openLib_result = await Promise.all(openLibraryQueries);

        for (let i=0; i<books.length;i++){
            books[i]={...books[i],...google_result[i],...openLib_result[i]}
        }

        return books;
    }
}
