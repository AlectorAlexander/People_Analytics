import { Model, DataTypes } from 'sequelize';
import Leadership from './leadershipModel';
import sequelize from '../database/config/connection';

class Employees extends Model {
    public id!: number;
    public enrollment!: string;
    public name!: string;
    public email!: string;
    public leaderEmail!: string;
    public title!: string;
    public hireDate!: Date;
    public terminationDate?: Date;
    public status!: string;

}

Employees.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        enrollment: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        leaderEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hireDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        terminationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'employees',
        sequelize, 
    }
);

Employees.hasMany(Leadership, { foreignKey: 'leaderEmail', sourceKey: 'email' });
Leadership.belongsTo(Employees, { foreignKey: 'leaderEmail', targetKey: 'email' });

export default Employees;
