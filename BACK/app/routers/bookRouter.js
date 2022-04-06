const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const bookController = require('../controllers/bookController');
const { verifyToken, verifyTokenWithoutError } = require('../middlewares/tokenVerifier');

const validate = require('../validator/validator');
const createSchema = require('../validator/schemas/bookCreate');

router
    .route('/book')
    /**
     * GET /v1/book
     * @summary Get all books in donation with users, order by last one
     * @tags BOOK
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(bookController.getAllInDonation))
    /**
     * POST /v1/book
     * @summary Add book and relation user_has_book to database or update if already exist
     * @tags BOOK
     * @param {InputBook} request.body.required - book info
     * @return {Book} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(controllerHandler(verifyToken), validate(createSchema, 'body'), controllerHandler(bookController.addBook));

router
    .route('/book/:id(\\d+)')
    /**
     * GET /v1/book/{id}
     * @summary Get one book in donation by id
     * @param {number} id.path.required - book identifier
     * @tags BOOK
     * @return {Book} 200 - success response - application/json
     */
    .get(controllerHandler(verifyTokenWithoutError),controllerHandler(bookController.getOneBookById));


router
    .route('/book/around-me')
     /**
     * GET /v1/book/around-me/
     * @summary Get one book in donation by id
     * @param {string} books.query ex : [1,2]
     * @tags BOOK
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(bookController.getDetailsBookAroundMe))
    /**
     * POST /v1/book/around-me
     * @summary Add book and relation user_has_book to database or update if already exist
     * @tags BOOK
     * @param {InputAroundMe} request.body.required - ex {"location" : "(48.5,2.3)", "radius" : 200}
     * @return {BookIdsAroundMe} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(controllerHandler(bookController.getBooksIdsAroundMe));



module.exports = router;
