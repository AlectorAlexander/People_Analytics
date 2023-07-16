import Employees from './employeesModel';
import Leadership from './leadershipModel';

Leadership.belongsTo(Employees, { foreignKey: 'leaderEmail', targetKey: 'email' });
Employees.hasMany(Leadership, { foreignKey: 'leaderEmail', sourceKey: 'email' });
