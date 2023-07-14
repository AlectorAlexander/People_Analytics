import { Op } from 'sequelize';
import Employees from '../model/employeesModel';

// Função para calcular o número de dias entre duas datas
function getNumberOfDays(startDate: Date, endDate: Date) {
    const oneDay = 24 * 60 * 60 * 1000; // número de milissegundos em um dia
    const start = new Date(startDate); // converter para objeto Date
    const end = new Date(endDate); // converter para objeto Date
  
    const diffInTime = end.getTime() - start.getTime(); // diferença em milissegundos
    const diffInDays = Math.round(diffInTime / oneDay); // arredondar para o número inteiro de dias
  
    return diffInDays;
}
  

class EmployeesService {
    // Obter um funcionário com base no email
    static async getEmployeeByEmail(email: string) {
        try {
            return await Employees.findOne({ where: { email } });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Obter todos os funcionários
    static async getAllEmployees() {
        try {
            return await Employees.findAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Calcular o headcount para um determinado período
    static async getHeadcountForPeriod(startDate: Date, endDate: Date, leaderEmail: string) {
        try {
            const activeEmployees = await Employees.findAll({
                where: {
                    [Op.or]: [
                        // Caso 1: Funcionários contratados antes do startDate e ainda ativos durante o período
                        {
                            hireDate: { [Op.lte]: endDate },
                            terminationDate: { [Op.or]: [{ [Op.gte]: startDate }, null] },
                            leaderEmail: leaderEmail
                        },
                        // Caso 2: Funcionários contratados durante o período e ainda ativos
                        {
                            hireDate: { [Op.between]: [startDate, endDate] },
                            terminationDate: { [Op.or]: [{ [Op.gte]: endDate }, null] },
                            leaderEmail: leaderEmail
                        }
                    ]
                }
            });
        
            const headcount = activeEmployees.length; // Número de funcionários ativos durante o período
            const averageNumberOfActiveEmployeesPerDay = headcount / getNumberOfDays(startDate, endDate); // Média de funcionários ativos por dia durante o período
        
            return {headcount, activeEmployees, averageNumberOfActiveEmployeesPerDay};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Calcular o turnover para um determinado período
    static async getTurnoverForPeriod(startDate: Date, endDate: Date, leaderEmail: string) {
        try {
            const employeesFired = await Employees.findAll({
                where: {
                    terminationDate: { [Op.between]: [startDate, endDate] },
                    leaderEmail: leaderEmail
                }
            });
        
            const activeEmployees = (await this.getHeadcountForPeriod(startDate, endDate, leaderEmail)).headcount; // Número de funcionários ativos durante o período

            const turnover = employeesFired.length / activeEmployees; // Taxa de rotatividade (funcionários demitidos / funcionários ativos)
            
            return {employeesFired, turnover};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}

export default EmployeesService;
