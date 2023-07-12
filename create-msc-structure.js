/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const shell = require('shelljs');
const fs = require('fs');

const tables = process.argv.slice(2).toString().split(',');

if (!shell.test('-d', 'src')) {
    shell.mkdir('-p', 'src');
}

if (!shell.test('-d', 'src/model')) {
    shell.mkdir('-p', 'src/model');
}
if (!shell.test('-d', 'src/service')) {
    shell.mkdir('-p', 'src/service');
}
if (!shell.test('-d', 'src/controller')) {
    shell.mkdir('-p', 'src/controller');
}
if (!shell.test('-d', 'src/database')) {
    shell.mkdir('-p', 'src/database');
}

tables.forEach((table) => {
    const tableName = table.trim();
    const tableModelName = `${tableName.charAt(0).toUpperCase() + tableName.slice(1)}Model`;
    const tableServiceName = `${tableName.charAt(0).toUpperCase() + tableName.slice(1)}Service`;
    const tableControllerName = `${tableName.charAt(0).toUpperCase() + tableName.slice(1)}Controller`;

    shell.ShellString(`export class ${tableModelName} {}`).to(`./src/model/${tableName}Model.ts`);
    shell.ShellString(`export class ${tableServiceName} {}`).to(`./src/service/${tableName}Service.ts`);
    shell.ShellString(`export class ${tableControllerName} {}`).to(`./src/controller/${tableName}Controller.ts`);
});

const connectionFileContent = `
const { Pool } = require('pg');

const pool = new Pool({
   user: 'your_username',
   host: 'localhost',
   database: 'your_database',
   password: 'your_password',
   port: 5432,
});

module.exports = pool;
`;

fs.writeFileSync('./src/database/connection.ts', connectionFileContent);
