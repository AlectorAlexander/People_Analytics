const dotenv = require('dotenv');
const express = require('express');
const sequelize = require('./database/config/connection');
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

app.get('/', (req: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
