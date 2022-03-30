const express = require('express');
const router = express.Router();

const controllerHandler = require("../middlewares/controllerWrapperAsync");
const bookController = require('../controllers/bookController');

const validate = require('../validator/validator');
const createSchema = require('../validator/schemas/bookCreate.js');

router
    .route('/book')
    /**
     * GET /v1/book
     * @summary Get all books in donation
     * @tags BOOK
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(bookController.getAllInDonation))
    /**
     * POST /v1/book
     * @summary Add book to database
     * @tags BOOK
     * @param {InputBook} request.body.required - book info
     * @return {Book} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(validate('body', createSchema), controllerHandler(bookController.addBook));


router
    .route('/book/:id(\\d+)')
    /**
     * GET /v1/book/{id}
     * @summary Get one book by id
     * @param {number} id.path.required - book identifier
     * @tags BOOK
     * @return {Book} 200 - success response - application/json
     */
    .get(controllerHandler(bookController.getOneBookById));

module.exports = router;