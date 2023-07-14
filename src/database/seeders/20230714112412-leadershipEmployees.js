'use strict';
const fs = require('fs');
const csv = require('csv-parser');

function reformatDate(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const employees = [];

    await new Promise((resolve) => {
      fs.createReadStream('./FolhaDePagamento.csv')
        .pipe(csv())
        .on('data', (row) => {
          if(row['email'].trim() !== '') {
            employees.push({
              leaderEmail: row['email do gestor']? row['email do gestor'] : null,
              enrollment: row['matrícula'],
              name: row['nome'],
              email: row['email'],
              title: row['cargo'],
              hireDate: reformatDate(row['data de admissão']),
              terminationDate: row['data de rescisão'] ? reformatDate(row['data de rescisão']) : null,
              status: row['status'],
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        })
        .on('end', resolve);
    });

    await queryInterface.bulkInsert('employees', employees, {});

    const leaderships = [];
    await new Promise((resolve) => {
      fs.createReadStream('./FolhaDePagamento.csv')
        .pipe(csv())
        .on('data', (row) => {
          // Only add to leaderships if both emails are not empty
          if(row['email'].trim() !== '' && row['email do gestor'].trim() !== '') {
            leaderships.push({
              leaderEmail: row['email do gestor'],
              subordinateEmail: row['email'],
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        })
        .on('end', resolve);
    });

    await queryInterface.bulkInsert('leadership', leaderships, {});

    console.log('CSV file successfully processed');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employees', null, {});
    await queryInterface.bulkDelete('leadership', null, {});
  },
};

