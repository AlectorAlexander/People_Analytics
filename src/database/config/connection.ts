import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}&sslmode=require`;

const sequelize = new Sequelize(URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Add this line if you encounter self-signed certificate error
        },
    },
});

export default sequelize;
