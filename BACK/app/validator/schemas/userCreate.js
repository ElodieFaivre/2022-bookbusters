/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .required(),
    bio: Joi.string(),
    location: Joi.string()
        .pattern(new RegExp(/^\([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)\)$/)),
    mail_donation: Joi.boolean().default(true)
        .required(),
    mail_alert: Joi.boolean().default(true)
        .required(),
    avatar_id: Joi.string()
        .required(),
});
