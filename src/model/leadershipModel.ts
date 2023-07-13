import { DataTypes, Model } from 'sequelize';
import Employees from './employeesModel';

class Leadership extends Model {
    public id!: number;
    public leadersEmail!: string;
    public sobordinatesEmail!: string;
}

Leadership.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    leadersEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sobordinatesEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'leadership',
    sequelize: require('../config/database'), 
});

Employees.hasMany(Leadership, { foreignKey: 'leaderEmail', sourceKey: 'email' });
Leadership.belongsTo(Employees, { foreignKey: 'leaderEmail', targetKey: 'email' });


export default Leadership;