static async getHeadcountForPeriod(startDate: number, endDate: number, leaderEmail: number) {
        const activeEmployees = await Employees.findAll({
            where: {
                [Op.or]: [
                    {
                        hireDate: { [Op.lte]: endDate },
                        terminationDate: { [Op.or]: [{ [Op.gte]: startDate }, null] },
                        leaderEmail
                    },
                    {
                        hireDate: { [Op.lt]: startDate },
                        terminationDate: { [Op.or]: [{ [Op.gte]: startDate }, null] },
                        leaderEmail
                    }
                ]
            }
        });
    
        const headcount = activeEmployees.length;
    
        return headcount;
    }