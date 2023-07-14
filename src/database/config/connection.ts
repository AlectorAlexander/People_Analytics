import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, SSL_CERT_PATH } = process.env;
const ca =  fs.readFileSync(SSL_CERT_PATH || 'ca-certificates.crt').toString();

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}&sslmode=require`;

const sequelize = new Sequelize(URL, {
    dialectOptions: {
        ssl: {
            require: true,
            ca
        },
    },
});

export default sequelize;
