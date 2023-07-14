/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, SSL_CA_CERT_PATH } = process.env;
const ca = require('fs').readFileSync(SSL_CA_CERT_PATH).toString();
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}&sslmode=require`;

module.exports = {
    development: {
        username: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        host: PGHOST,
        dialect: 'postgres',
        migrationStoragePath: 'src/database/migrations',
        seederStoragePath: 'src/database/seeders',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
                ca
            },
        },
    },
    production: {
        use_env_variable: URL,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
                ca
            },
        },
        migrationStoragePath: 'src/database/migrations',
        seederStoragePath: 'src/database/seeders',
    },
};
