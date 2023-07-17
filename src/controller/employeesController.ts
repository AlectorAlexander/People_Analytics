// Importa o módulo 'express' e o serviço 'EmployeesService'
import express from 'express';
import EmployeesService from '../services/employeesService';

// Cria o roteador do Express
const EmployeesController = express.Router();

// Rota para obter um funcionário pelo email
EmployeesController.get('/employee/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const employee = await EmployeesService.getEmployeeByEmail(email);
        if (!employee) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
});

// Rota para obter todos os funcionários
EmployeesController.get('/employees', async (req, res) => {
    try {
        const employees = await EmployeesService.getAllEmployees();
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
});

// Rota para obter a contagem de funcionários ativos para um período
EmployeesController.post('/headcount', async (req, res) => {
    try {
        const { startDate, endDate, leaderEmail } = req.body;
        const result = await EmployeesService.getHeadcountForPeriod(new Date(startDate as string), new Date(endDate), leaderEmail);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
});

// Rota para obter a taxa de rotatividade para um período
EmployeesController.post('/turnover', async (req, res) => {
    try {
        const { startDate, endDate, leaderEmail } = req.body;
        const result = await EmployeesService.getTurnoverForPeriod(new Date(startDate as string), new Date(endDate as string), leaderEmail as string);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
});

// Rota para obter a contagem de funcionários ativos (incluindo subordinados indiretos) para um período
EmployeesController.post('/headcountForIndirects', async (req, res) => {
    try {
        const { startDate, endDate, leaderEmail } = req.body;
        const result = await EmployeesService.getHeadcountForPeriodForIndirectSubordinates(new Date(startDate as string), new Date(endDate), leaderEmail);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
});

// Rota para obter a taxa de rotatividade (incluindo subordinados indiretos) para um período
EmployeesController.post('/turnoverForIndirects', async (req, res) => {
    try {
        const { startDate, endDate, leaderEmail } = req.body;
        const result = await EmployeesService.getTurnoverForPeriodForIndirectSubordinates(new Date(startDate as string), new Date(endDate as string), leaderEmail as string);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
});

// Exporta o roteador como padrão
export default EmployeesController;
