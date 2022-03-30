const { Pool } = require('pg');

const config = {
    connectionString: process.env.PG_URL,
};


const pool = new Pool(config);

module.exports = pool;
