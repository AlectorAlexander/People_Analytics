import { Op } from 'sequelize';
import Employees from '../model/employeesModel';



interface Employee {
    id: number;
    enrollment: string;
    name: string;
    email: string;
    leaderEmail: string;
    title: string;
    hireDate: string;
    terminationDate: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    directSubordinates?: {[key: string]: Employees};
}

class EmployeesService {
    // Obter um funcionário com base no email
    static async getEmployeeByEmail(email: string) {
        try {
            const employee = await Employees.findOne({ where: { email } });
            return employee;
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
            // Cálculo do início e fim do período com base nos parâmetros de data fornecidos
            const startOfPeriod = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            const endOfPeriod = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
    
            // Consulta no banco de dados para obter os funcionários ativos no início do mês
            const startOfMonthActiveEmployees = await Employees.findAll({
                where: {
                    hireDate: { [Op.lte]: startOfPeriod },
                    terminationDate: { [Op.or]: [{ [Op.gt]: startOfPeriod }, null] },
                    leaderEmail: leaderEmail
                }
            });
            
            // Consulta no banco de dados para obter os funcionários ativos no fim do mês
            const endOfMonthActiveEmployees = await Employees.findAll({
                where: {
                    hireDate: { [Op.lte]: endOfPeriod },
                    terminationDate: { [Op.or]: [{ [Op.gt]: endOfPeriod }, null] },
                    leaderEmail: leaderEmail
                }
            });
            
            // Combinando os funcionários ativos no início e no fim do mês
            const activeEmployees = [...startOfMonthActiveEmployees, ...endOfMonthActiveEmployees];
    
            // Criando um mapa para armazenar funcionários únicos com base no ID
            const uniqueEmployeesMap = new Map();
    
            // Iterando pelos funcionários ativos e adicionando-os ao mapa
            activeEmployees.forEach(employee => {
                if(!uniqueEmployeesMap.has(employee.id)) {
                    uniqueEmployeesMap.set(employee.id, employee);
                }
            });
    
            // Convertendo o mapa de volta para um array de funcionários únicos
            const uniqueEmployees = Array.from(uniqueEmployeesMap.values());
    
            // Cálculo da contagem de funcionários (média entre o início e o fim do mês)
            const headcount = (startOfMonthActiveEmployees.length + endOfMonthActiveEmployees.length) / 2;
            
            // Retornando o resultado da contagem de funcionários e a lista de funcionários ativos únicos
            return { headcount, activeEmployees: uniqueEmployees };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getHeadcountForPeriodForIndirectSubordinates(startDate: Date, endDate: Date, leaderEmail: string, allHeadcounts: number[] = []): Promise<{ employee: Employee, headcount: number }> {
        try {
            const { activeEmployees, headcount } = await this.getHeadcountForPeriod(startDate, endDate, leaderEmail);
            allHeadcounts.push(headcount);
            const leader = leaderEmail ? 
                await Employees.findOne({ where: { email: leaderEmail } }) : 
                await Employees.findOne({ where: { leaderEmail: null } });
    
            if (!leader) {
                throw new Error('Leader not found');
            }
    
            const leaderData = leader.get({ plain: true });
            leaderData.directSubordinates = {};
    
            if (activeEmployees && activeEmployees.length > 0) {
                for (const possibleSubordinate of activeEmployees) {
                    if (possibleSubordinate.leaderEmail === leaderEmail) {
                        const subordinateResult = await this.getHeadcountForPeriodForIndirectSubordinates(startDate, endDate, possibleSubordinate.email);
                        leaderData.directSubordinates[possibleSubordinate.name] = subordinateResult.employee;
                    }
                }
                

                return { employee: leaderData, headcount };
            }
            // calcula média do total de headcounts
            const averageHeadcounts = allHeadcounts.reduce((acc, curr) => acc + curr, 0);

    
            return { employee: leaderData, headcount: averageHeadcounts };
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

    static async getTurnoverForPeriodForIndirectSubordinates(startDate: Date, endDate: Date, leaderEmail: string) {
        try {
            const employeesFired = await Employees.findAll({
                where: {
                    terminationDate: { [Op.between]: [startDate, endDate] },
                    leaderEmail: leaderEmail
                }
            });
    
            const headcountData = await this.getHeadcountForPeriodForIndirectSubordinates(startDate, endDate, leaderEmail);
            const activeEmployees = headcountData.headcount; // Número de funcionários ativos durante o período
    
            const turnover = employeesFired.length / activeEmployees; // Taxa de rotatividade (funcionários demitidos / funcionários ativos)
    
            return { employeesFired, turnover };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
   
    
}

export default EmployeesService;
