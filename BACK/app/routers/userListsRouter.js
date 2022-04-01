const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const userBooksController = require('../controllers/userListsController');

const validate = require('../validator/validator');


router
    .route('/user/:id/library')
    /**
     * GET /v1/user/{userId}/library
     * @summary Get all books in a user's library, in alphabetic order by title
     * @tags LIBRARY
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(userBooksController.getAllBooksInLibrary));

module.exports = router;
