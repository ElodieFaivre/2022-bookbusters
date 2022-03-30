const debug = require('debug')('ErrorHandler');
const ApiError = require('../errors/apiError');
const logger = require('../helpers/logger');

const handleError = (error, _, response, next) => {
    // on veut filtrer les erreurs à faire persister afin de ne pas pourir notre fichier de log
    // on prend en compte toutes les erreurs qui ne sont pas des ApiError
    // et aussi toutes les ApiError qui ont un status différent de 404

    if (!error.status || error.status !== 404) {
        logger.error(error);
    } else {
        debug(error);
    }

    // custom error
    if (error instanceof ApiError) {
        return response.status(error.status).json(error.message);
    }

    // autres erreurs possibles : sûrement assez technique (pb code, sql, ...)
    // on envoie un message générique au front pour signaler un pépin
    // que seuls les backeux pourront régler
    return response.status(500).json('Internal server error');
};

module.exports = handleError;
