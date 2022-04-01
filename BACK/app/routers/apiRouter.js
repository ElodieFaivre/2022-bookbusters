const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const apiController = require('../controllers/apiController');

router
    .route('/book/isbn/:isbn')
    /**
     * GET /v1/book/isbn/{isbn}
     * @summary Find one book with ISBN in google API
     * @param {number} isbn.path.required - book ISBN
     * @tags BOOK
     * @return {BookInfo} 200 - success response - application/json
     * @return  {ApiError} 404 - Book not found
     */
    .get(controllerHandler(apiController.getBookByISBN));

router
    .route('/book/cover/isbn/:isbn')
    /**
     * GET /v1/book/cover/isbn/{isbn}
     * @summary Find one book cover with ISBN in Open Library API
     * @param {number} isbn.path.required - book ISBN
     * @tags COVER
     * @return {BookCover} 200 - success response - application/json
     * @return  {ApiError} 404 - Book not found
     */
    .get(controllerHandler(apiController.getBookCoverByISBN));

module.exports = router;
