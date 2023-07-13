/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();


const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
console.log(URL);
module.exports = {
    development: {
        username: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        host: PGHOST,
        dialect: 'postgres',
        migrationStoragePath: 'src/database/migrations',
        seederStoragePath: 'src/database/seeders',
    },
    production: {
        use_env_variable: URL,
        dialect: 'postgres',
        migrationStoragePath: 'src/database/migrations',
        seederStoragePath: 'src/database/seeders',
    },
};