// const debug = require('debug')('middleware:tokenVerifier');

const jwt = require('jsonwebtoken');
const { ApiError } = require('../middlewares/handleError');

module.exports = {
    // Middleware to get and verify token received from frontend
    verifyToken(req, res, next) {
        const { token } = req.headers;

        if (!token) {
            throw new ApiError('Access denied. No token provided', { statusCode: 401 });
        }

        jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
            if (err) {
                throw new ApiError('Access denied. Invalid token', { statusCode: 401 });
            } else {

                req.body.user = decoded;

                next();
            }
        });
    },
    // Middleware to get and verify token received from frontend
    verifyTokenWithoutError(req, res, next) {
        const { token } = req.headers;

        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
                if (!err) {
                    req.body.user = decoded;
                }
            });
        }
        next();
    },
};
