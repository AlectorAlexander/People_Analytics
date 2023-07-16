/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './database/config/connection';
import './model/employeesModel';  // Import Employees model
import './model/leadershipModel'; // Import Leadership model
import './model/relationships'; // Import relationship definitions
import EmployeesController from './controller/employeesController';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1', EmployeesController);

sequelize
    .authenticate()
    .then(() => {
        console.log('Successful database connection!');
    })
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
