/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    password: Joi.string(),
    bio: Joi.string(),
    location: Joi.string()
        .pattern(new RegExp(/^\([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)\)$/)),
    mail_donation: Joi.boolean(),
    mail_alert: Joi.boolean(),
    avatar_id: Joi.integer(),
});
