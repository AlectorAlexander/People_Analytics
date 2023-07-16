import express from 'express';
import EmployeesService from '../services/employeesService';

const EmployeesController = express.Router();

// Route to get an employee by email
EmployeesController.get('/employee/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const employee = await EmployeesService.getEmployeeByEmail(email);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Route to get all employees
EmployeesController.get('/employees', async (req, res) => {
    try {
        const employees = await EmployeesService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Route to get headcount for a period
EmployeesController.post('/headcount', async (req, res) => {
    try {
        const { startDate, endDate, leaderEmail  } = req.body;
        const result = await EmployeesService.getHeadcountForPeriod(new Date(startDate as string), new Date(endDate), leaderEmail);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Route to get turnover for a period
EmployeesController.post('/turnover', async (req, res) => {
    try {
        const { startDate, endDate, leaderEmail } = req.body;
        const result = await EmployeesService.getTurnoverForPeriod(new Date(startDate as string), new Date(endDate as string), leaderEmail as string);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default EmployeesController;
