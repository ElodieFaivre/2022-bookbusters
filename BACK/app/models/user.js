const client = require('../config/database');

/**
 * @typedef {object} User
 * @property {number} id - Identifiant unique, Pk de la table
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} bio
 * @property {point} location
 * @property {boolean} mail_donation
 * @property {boolean} mail_alert
 * @property {number} avatar_id
 */

const userDataMapper = {

    async findAll() {
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },

    async findOneUserById(userId) {
        const result = await client.query('SELECT * FROM "user" WHERE id = $1', [
            userId,
        ]);
        return result.rows[0];
    },

    /**
     * Ajoute dans la base de données
     * @param {InputUser} user - Les données à insérer
     * @returns {User} - Le user ajouté
     */
    async insert(user) {
        const savedUser = await client.query(
            `
            INSERT INTO "user"
            ("username", "email", "password", "bio", "location", "mail_donation", "mail_alert", "avatar_id") VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
        `,
            [user.username, user.email, user.password, user.bio, user.location,
                user.mail_donation, user.mail_alert, user.avatar_id,
            ],
        );

        return savedUser.rows[0];
    },
};

module.exports = userDataMapper;
