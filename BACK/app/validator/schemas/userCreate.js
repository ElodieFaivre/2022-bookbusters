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
    location: Joi.string(),
    // .ordered([
    //   Joi.number().min(0).max(90).required(),
    // Joi.number().min(-180).max(180).required()])
    //    .required(),
    mail_donation: Joi.boolean().default(true)
        .required(),
    mail_alert: Joi.boolean().default(true)
        .required(),
    avatar_id: Joi.string()
        .required(),
});
