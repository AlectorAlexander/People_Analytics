import { Op } from 'sequelize';
import Leadership from '../model/leadershipModel';

class LeadershipService {

    static async getHeadcountForMonthLead(day: number, month: number, year: number) {
        const startDate = new Date(year, month - 1, day);
        const endDate = new Date(year, month - 1, new Date(year, month, 0).getDate());
    
        const activeCount = await Leadership.count({
            where: {
                hireDate: {
                    [Op.between]: [startDate, endDate]
                },
                status: 'ativo' // Filtra apenas funcionários ativos
            }
        });
    
        const average = activeCount;
    
        return { activeCount, average };
    }
     
    static async getDirectSubordinates(email) {
        // Logic to retrieve direct subordinates of a given employee
        }
    
        static async getIndirectSubordinates(email) {
        // Logic to retrieve indirect subordinates of a given employee
        }
    

    // Add additional methods as needed for your application

}

export default LeadershipService;
