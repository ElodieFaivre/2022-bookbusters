const debug = require('debug')('controller:user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('../services/mailer');
const userDataMapper = require('../models/user');
const { ApiError } = require('../middlewares/handleError');

module.exports = {
    /**
     * User controller to get all users.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAll(req, res) {
        const users = await userDataMapper.findAll();
        return res.json(users);
    },

    /**
     * User controller to get a user by is id.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getOneUserById(req, res) {
        const RouteUserId = Number(req.params.id);
        const ConnectedUserId = Number(req.body.user.userId);

        if (ConnectedUserId !== RouteUserId) {
            throw new ApiError('Unauthorized access', { statusCode: 401 });
        }

        const user = await userDataMapper.findOneUserById(RouteUserId);
        if (!user) {
            throw new ApiError('User not found', { statusCode: 404 });
        }
        return res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            location: user.location,
            mail_donation: user.mail_donation,
            mail_alert: user.mail_alert,
            avatar_id: user.avatar_id,
        });
    },

    /**
     * User controller to create a new user
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
        } else {
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = encryptedPassword;

            const savedUser = await userDataMapper.insert(req.body);

            await mailer.confirmationMail(savedUser);

            return res.json(savedUser);
        }
    },

    /**
     * User controller to delete a user.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async deleteOneUserById(req, res) {
        const RouteUserId = Number(req.params.id);
        const ConnectedUserId = Number(req.body.user.userId);

        if (ConnectedUserId !== RouteUserId) {
            throw new ApiError('Unauthorized access', { statusCode: 401 });
        }

        const user = await userDataMapper.findOneUserById(RouteUserId);
        if (!user) {
            throw new ApiError('This user does not exists', { statusCode: 404 });
        }

        await userDataMapper.delete(RouteUserId);
        return res.status(204).json();
    },

    /**
     * User controller to update a user.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async update(req, res) {
        const RouteUserId = Number(req.params.id);
        const ConnectedUserId = Number(req.body.user.userId);

        if (ConnectedUserId !== RouteUserId) {
            throw new ApiError('Unauthorized access', { statusCode: 401 });
        }

        const user = await userDataMapper.findOneUserById(RouteUserId);
        if (!user) {
            throw new ApiError('This user does not exists', { statusCode: 404 });
        }

        if (req.body.username || req.body.email) {
            const existingUser = await userDataMapper.isUnique(req.body, RouteUserId);
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
        const savedUser = await userDataMapper.update(RouteUserId, req.body);
        return res.json({
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            bio: savedUser.bio,
            location: savedUser.location,
            mail_donation: savedUser.mail_donation,
            mail_alert: savedUser.mail_alert,
            avatar_id: savedUser.avatar_id,
        });
    },

    /**
     * User controller to log in a user.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async login(req, res) {
        const foundUser = await userDataMapper.findOneUserByEmail(req.body.login);

        if (!foundUser || !(await bcrypt.compare(req.body.password, foundUser.password))) {
            throw new ApiError('Login or password not correct', { statusCode: 400 });
        }
        if (!foundUser.active_account) {
            throw new ApiError('Please confirm your email to login', { statusCode: 403 });
        }

        jwt.sign(
            { userId: foundUser.id },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: '30m' },
            (err, token) => {
                res.json({ token, foundUser });
            },
        );
    },

    /**
     * User controller to swith active an account.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async swithTheAccountActive(req, res) {
        const id = jwt.verify(req.params.token, process.env.SECRET_TOKEN_KEY);
        debug('id:', id);
        const user = await userDataMapper.swithTheAccountActive(id.userId);
        debug("user:", user);
        if (!user) {
            throw new ApiError('User id not found', { statusCode: 400 });
        }
        else { res.json(user); }
    },
};
