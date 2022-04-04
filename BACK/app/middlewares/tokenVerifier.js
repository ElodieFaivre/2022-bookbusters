const debug = require('debug')('middleware:token');
const jwt = require('jsonwebtoken');
const ApiError = require('../errors/apiError');

module.exports = {
    // Middleware to get and verify token received from frontend
    verifyToken(req, res, next) {
        const bearerHeader = req.headers.authorization;

        if (!bearerHeader) {
            throw new ApiError('No token received', 400);
        }

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, process.env.SECRET_TOKEN_KEY, (err, authData) => {
            if (err) {
                throw new ApiError('Invalid token', 400);
            } else {
                debug('Valid token : ', req.token);
                const decodedToken = jwt.decode(req.token, {
                    complete: true,
                });
                debug(decodedToken.header);
                debug(decodedToken.payload);

                next();
            }
        });
    },
};
