import dotenv from 'dotenv';
import postgres from 'postgres';
import pool from './database/connection';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

async function getPgVersion() {
    const result = await sql`select version()`;
    console.log(result);
}

getPgVersion();

app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        await client.query('SELECT 1'); // Perform a simple ping
        client.release();
        res.status(200).send('Successful database connection!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
