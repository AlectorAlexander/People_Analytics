import { Op } from 'sequelize';
import Employees from '../model/employeesModel';


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
            const startOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            const endOfMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
    
            const startOfMonthActiveEmployees = await Employees.findAll({
                where: {
                    hireDate: { [Op.lte]: startOfMonth },
                    terminationDate: { [Op.or]: [{ [Op.gt]: startOfMonth }, null] },
                    leaderEmail: leaderEmail
                }
            });
            
            const endOfMonthActiveEmployees = await Employees.findAll({
                where: {
                    hireDate: { [Op.lte]: endOfMonth },
                    terminationDate: { [Op.or]: [{ [Op.gt]: endOfMonth }, null] },
                    leaderEmail: leaderEmail
                }
            });
            
            
            // Obtemos todos os funcionários ativos do início e do final do mês
            const activeEmployees = [...startOfMonthActiveEmployees, ...endOfMonthActiveEmployees];
    
            // Criamos um novo Map para armazenar os funcionários únicos, usando o id do funcionário como chave
            const uniqueEmployeesMap = new Map();
    
            activeEmployees.forEach(employee => {
                // Se o funcionário ainda não está no Map, nós o adicionamos
                if(!uniqueEmployeesMap.has(employee.id)) {
                    uniqueEmployeesMap.set(employee.id, employee);
                }
            });
    
            // Transformamos o Map de volta em um array
            const uniqueEmployees = Array.from(uniqueEmployeesMap.values());
    
            // Agora, a variável uniqueEmployees contém apenas funcionários únicos. 
            const headcount = (startOfMonthActiveEmployees.length + endOfMonthActiveEmployees.length) / 2;
            
            return { headcount, activeEmployees: uniqueEmployees };
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
