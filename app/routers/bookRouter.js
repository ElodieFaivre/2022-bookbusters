const express = require('express');
const router = express.Router();

const controllerHandler = require("../middlewares/controllerWrapperAsync");

const bookController = require('../controllers/bookController')

router
    .route('/')
    /**
     * GET /v1/
     * @summary Get all books
     * @tags BOOKS
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(bookController.getAll));


module.exports = router;