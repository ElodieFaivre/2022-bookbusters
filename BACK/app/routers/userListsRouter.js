const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const userBooksController = require('../controllers/userListsController');

router
    .route('/user/:id(\\d+)/library')
    /**
     * GET /v1/user/{id}/library
     * @summary Get all books in a user's library by the user ID, and order by title
     * @param {number} id.path.required - user identifier
     * @tags USER'S LISTS
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(userBooksController.getAllBooksInLibrary));

router
    .route('/user/:id(\\d+)/favorite')
    /**
     * GET /v1/user/{id}/favorite
     * @summary Get all books in a user's favorites list by the user ID, and order by title
     * @param {number} id.path.required - user identifier
     * @tags USER'S LISTS
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(userBooksController.getAllBooksInFavorite));

router
    .route('/user/:id(\\d+)/alert')
    /**
     * GET /v1/user/{id}/alert
     * @summary Get all books in a user's alerts list by the user ID, and order by title
     * @param {number} id.path.required - user identifier
     * @tags USER'S LISTS
     * @return {[Book]} 200 - success response - application/json
     */
    .get(controllerHandler(userBooksController.getAllBooksInAlert));

module.exports = router;
