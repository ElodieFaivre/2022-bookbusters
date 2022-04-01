const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const userController = require('../controllers/userController');

const validate = require('../validator/validator');
const createSchema = require('../validator/schemas/userCreate');
const updateSchema = require('../validator/schemas/userUpdate');

router
    .route('/user')
    /**
     * GET /v1/user
     * @summary Get all users
     * @tags USER
     * @return {[User]} 200 - success response - application/json
     */
    .get(controllerHandler(userController.getAll))
    /**
     * POST /v1/user
     * @summary Add a user to database
     * @tags USER
     * @param {InputUser} request.body.required - user info
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(validate(createSchema, 'body'), controllerHandler(userController.addUser));

router
    .route('/user/:id(\\d+)')
    /**
     * GET /v1/user/{id}
     * @summary Get one user by its id
     * @param {number} id.path.required - user identifier
     * @tags USER
     * @return {User} 200 - success response - application/json
     */
    .get(controllerHandler(userController.getOneUserById))
/**
     * DELETE /v1/user/{id}
     * @summary Delete one user
     * @tags USER
     * @param {number} id.path.required - user identifier
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .delete(controllerHandler(userController.deleteOneUserById))
      /**
     * PATCH /v1/user/{id}
     * @summary Update one user
     * @tags USER
     * @param {number} id.path.required - user identifier
     * @param {InputUser} request.body.required - user info
     * @return {User} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - User not found - application/json
     */
    .patch(validate(updateSchema, 'body'), controllerHandler(userController.update));
module.exports = router;
