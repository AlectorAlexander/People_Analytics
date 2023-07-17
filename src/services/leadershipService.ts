import Leadership from '../model/leadershipModel';

class LeadershipService {
    static async getDirectSubordinates(email: string): Promise<Leadership[]> {
        try {
            const subordinates = await Leadership.findAll({
                where: {
                    leaderEmail: email
                }
            });


            return subordinates;
        } catch (error) {
            throw new Error(`Error in getDirectSubordinates: ${error}`);
        }
    }

    static async getDirectLeaders(email: string): Promise<Leadership[]> {
        try {
            const leaders = await Leadership.findAll({
                where: {
                    subordinateEmail: email
                }
            });

            return leaders;
        } catch (error) {
            throw new Error(`Error in getDirectLeaders: ${error}`);
        }
    }

    static async getIndirectSubordinates(email: string): Promise<Leadership[]> {
        try {
            const directSubordinates = await this.getDirectSubordinates(email);
            let indirectSubordinates: Leadership[] = [];

            for (const subordinate of directSubordinates) {
                const { subordinateEmail } = subordinate;
                const subordinates = await this.getIndirectSubordinates(subordinateEmail);
                indirectSubordinates = [...indirectSubordinates, ...subordinates];
            }

            return [...directSubordinates, ...indirectSubordinates];
        } catch (error) {
            throw new Error(`Error in getIndirectSubordinates: ${error}`);
        }
    }

    static async getIndirectLeaders(email: string): Promise<Leadership[]> {
        try {
            const directLeaders = await this.getDirectLeaders(email);
            let indirectLeaders: Leadership[] = [];

            for (const leader of directLeaders) {
                const { leaderEmail } = leader;
                const leaders = await this.getIndirectLeaders(leaderEmail);
                indirectLeaders = [...indirectLeaders, ...leaders];
            }

            return [...directLeaders, ...indirectLeaders];
        } catch (error) {
            throw new Error(`Error in getIndirectLeaders: ${error}`);
        }
    }
}

export default LeadershipService;