import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config/connection';

class Leadership extends Model {
    public id!: number;
    public leaderEmail!: string;
    public sobordinateEmail!: string;
}

Leadership.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    leaderEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sobordinateEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'leadership',
    sequelize, 
});


export default Leadership;