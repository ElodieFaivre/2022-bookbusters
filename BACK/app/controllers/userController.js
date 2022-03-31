const userDataMapper = require('../models/user');
const ApiError = require('../errors/apiError');

module.exports = {
    /**
     * Product controller to get all users.
     * ExpressMiddleware signature
     * @param {object} req Express req.object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAll(req, res) {
        const users = await userDataMapper.findAll();
        return res.json(users);
    },

    async getOneUserById(req, res) {
        const userId = req.params.id;
        const user = await userDataMapper.findOneUserById(userId);
        if (!user) {
            throw ApiError('User not found', 404);
        }
        return res.json(user);
    },

    /**
     * Book controller to add a book
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async addUser(req, res) {
        const savedUser = await userDataMapper.insert(req.body);
        return res.json(savedUser);
    },
};
