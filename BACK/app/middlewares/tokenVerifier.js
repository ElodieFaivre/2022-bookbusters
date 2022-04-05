const debug = require('debug')('middleware:verifyToken');

const jwt = require('jsonwebtoken');
const ApiError = require('../errors/apiError');

module.exports = {
    // Middleware to get and verify token received from frontend
    verifyToken(req, res, next) {
        const { token } = req.headers;

        if (!token) {
            throw new ApiError('Access denied. No token provided', 401);
        }

        jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
            if (err) {
                throw new ApiError('Access denied. Invalid token', 401);
            } else {
                req.body.userId = decoded.user.id;

                next();
            }
        });
    },
    // Middleware to get and verify token received from frontend
    verifyTokenWithoutError(req, res, next) {
        const { token } = req.headers;

        if(token) {
            jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
                if (!err) {
                    req.body.userId = decoded.user.id;
                }
            });
        }
        next();

    },

};
