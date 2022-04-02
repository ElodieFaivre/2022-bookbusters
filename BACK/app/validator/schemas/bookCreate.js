const Joi = require('joi');

module.exports = Joi.object({
    ISBN13: Joi.string().length(13),
    ISBN10: Joi.string().length(10),
    ISBN10_formatted: Joi.string(),
    ISBN13_formatted: Joi.string(),
}).min(1).required();
