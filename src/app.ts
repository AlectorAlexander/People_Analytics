import dotenv from 'dotenv';
import express from 'express';
import sequelize from './database/config/connection';
dotenv.config();


const app = express();
const port = process.env.PORT;

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Successful database connection!');
    })
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
