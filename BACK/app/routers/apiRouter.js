const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const { verifyToken, verifyTokenWithoutError } = require('../middlewares/tokenVerifier');

const apiController = require('../controllers/apiController');

router
    .route('/book/isbn/:isbn')
    /**
     * GET /v1/book/isbn/{isbn}
     * @summary Find one book with ISBN in google API
     * @tags SEARCH BOOK API
     * @security BearerAuth
     * @param {number} isbn.path.required - book ISBN
     * @return {BookInfo} 200 - success response - application/json
     * @return  {ApiError} 404 - Book not found
     */
    .get(controllerHandler(verifyTokenWithoutError),controllerHandler(apiController.getBookByISBN));

router
    .route('/book/cover/isbn/:isbn')
    /**
     * GET /v1/book/cover/isbn/{isbn}
     * @summary Find one book cover with ISBN in Open Library API
     * @tags SEARCH BOOK API
     * @security BearerAuth
     * @param {number} isbn.path.required - book ISBN
     * @return {BookCover} 200 - success response - application/json
     * @return  {ApiError} 404 - Book not found
     */
    .get(controllerHandler(verifyTokenWithoutError),controllerHandler(apiController.getBookCoverByISBN));

router
    .route('/book/search')
    /**
     * GET /v1/book/search
     * @summary Find books by Keyword
     * @tags SEARCH BOOK API
     * @security BearerAuth
     * @param {string} q.query
     * @return {[BookInfo]} 200 - success response - application/json
     */
    .get(controllerHandler(verifyTokenWithoutError),controllerHandler(apiController.getBookByKeyword));

module.exports = router;
