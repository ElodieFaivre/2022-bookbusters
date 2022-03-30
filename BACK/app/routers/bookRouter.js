const express = require('express');
const router = express.Router();

const controllerHandler = require("../middlewares/controllerWrapperAsync");

const bookController = require('../controllers/bookController')

router
    .route('/book')
    /**
     * GET /v1/book
     * @summary Get all books
     * @tags BOOKS
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(bookController.getAll));


router
    .route('/book/:id')
    /**
     * GET /v1/book/{id}
     * @summary Get one book by id
     * @param {number} id.path.required - book identifier
     * @tags BOOK
     * @return {Book} 200 - success response - application/json
     */
    .get(controllerHandler(bookController.getOneBookById));

module.exports = router;