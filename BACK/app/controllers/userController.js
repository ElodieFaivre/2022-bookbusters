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
        const existingUser = await userDataMapper.isUnique(req.body);
            if (existingUser) {
                let field;
                if (existingUser.username === req.body.username) {
                    field = 'username';
                } else {
                    field = 'email';
                }
                throw new ApiError(`Other user already exists with this ${field}`, {
                    statusCode: 400,
                });
            }
        else {const savedUser = await userDataMapper.insert(req.body);
            return res.json(savedUser);}
        
    },

    /**
     * User controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async deleteOneUserById(req, res) {
        const user = await userDataMapper.findOneUserById(req.params.id);
        if (!user) {
            throw new ApiError('This user does not exists', { statusCode: 404 });
        }

        await userDataMapper.delete(req.params.id);
        return res.status(204).json();
    },

    /**
     * User controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async update(req, res) {
        const user = await userDataMapper.findOneUserById(req.params.id);
        if (!user) {
            throw new ApiError('This user does not exists', { statusCode: 404 });
        }

        if (req.body.username || req.body.email) {
            const existingUser = await userDataMapper.isUnique(req.body, req.params.id);
            if (existingUser) {
                let field;
                if (existingUser.username === req.body.username) {
                    field = 'username';
                } else {
                    field = 'email';
                }
                throw new ApiError(`Other user already exists with this ${field}`, {
                    statusCode: 400,
                });
            }
        }
        const savedUser = await userDataMapper.update(req.params.id, req.body);
        return res.json(savedUser);
    },
};
