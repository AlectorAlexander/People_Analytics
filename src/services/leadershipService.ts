import Leadership from '../model/leadershipModel';

class LeadershipService {
     
    static async getDirectSubordinates(email: string) {
        try {
            const subordinates = await Leadership.findAll({
                where: {
                    leaderEmail: email
                }
            });

            return subordinates;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }
    

}

export default LeadershipService;
