/**
 * @typedef {object} ApiError
 * @property {string} message - Error message
 * @property {number} status - HTTP Status code
 *
 */

class ApiError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}

module.exports = ApiError;
