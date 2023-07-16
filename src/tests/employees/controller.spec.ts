import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

describe('Employees Controller', function() {
    this.timeout(5000); 
  it('gets an employee by email', async () => {
    const email = 'pamelaberry@kpis.tech';

    // Faz uma solicitação GET para a rota correspondente ao email do funcionário
    const response = await request(app).get(`/api/v1/employee/${email}`);

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).to.equal(200);
    // Verifica se o email retornado na resposta é igual ao email esperado
    expect(response.body.email).to.equal(email);

  
  });

  it('returns null if employee email is not found', async () => {
    const email = 'notfound@example.com';

    // Faz uma solicitação GET para a rota correspondente ao email do funcionário que não existe
    const response = await request(app).get(`/api/v1//employee/${email}`);

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).to.equal(200);
    // Verifica se o corpo da resposta é nulo
    expect(response.body).to.be.null;
  });

  it('returns zero headcount for a period without employees', async () => {
    const startDate = '2011-01-01';
    const endDate = '2012-12-31';
    const leaderEmail = 'daniellewinters@kpis.tech';

    // Faz uma solicitação POST para a rota correspondente à contagem de funcionários ativos
    const response = await request(app)
      .post('/api/v1/headcount')
      .send({ startDate, endDate, leaderEmail });

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).to.equal(200);
    // Verifica se a contagem de funcionários é zero
    expect(response.body.headcount).to.equal(0);
    // Verifica se o array de funcionários ativos é um array vazio
    expect(response.body.activeEmployees).to.be.an('array').that.is.empty;
  });

  it('returns null turnover for a period without employee departures', async () => {
    const startDate = '2011-01-01';
    const endDate = '2012-12-31';
    const leaderEmail = 'daniellewinters@kpis.tech';

    // Faz uma solicitação POST para a rota correspondente à taxa de rotatividade
    const response = await request(app)
      .post('/api/v1/turnover')
      .send({ startDate, endDate, leaderEmail });

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).to.equal(200);
    // Verifica se o array de funcionários demitidos é um array vazio
    expect(response.body.employeesFired).to.be.an('array').that.is.empty;
    // Verifica se a taxa de rotatividade é zero
    expect(response.body.turnover).to.equal(null);
  });

  it('returns correct turnover for a period with employee departures', async () => {
    const startDate = '2020-01-17';
    const endDate = '2021-10-31';
    const leaderEmail = 'daniellewinters@kpis.tech';

    // Faz uma solicitação POST para a rota correspondente à taxa de rotatividade
    const response = await request(app)
      .post('/api/v1/turnover')
      .send({ startDate, endDate, leaderEmail });

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).to.equal(200);
    // Verifica se o array de funcionários demitidos não é vazio
    expect(response.body.employeesFired).to.be.an('array');
    // Verifica se a taxa de rotatividade é um número
    expect(response.body.turnover).to.be.a('number');
  });

  it('gets all employees', async () => {
    // Faz uma solicitação GET para a rota correspondente a todos os funcionários
    const response = await request(app).get('/api/v1/employees');

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).to.equal(200);
    // Verifica se o corpo da resposta é um array
    expect(response.body).to.be.an('array');
  });

  it('gets headcount for a period', async () => {
    const leaderEmails = [
      'loricampbell@kpis.tech',
      'robinmcdaniel@kpis.tech',
      'mitchellpeters@kpis.tech', 
      'sharonbarr@kpis.tech',
  ];
  
  leaderEmails.forEach(leaderEmail => {
      it(`gets headcount for a period for leader ${leaderEmail}`, async () => {
          const startDate = '2021-01-17';
          const endDate = '2021-10-31';
  
          // Faz uma solicitação POST para a rota correspondente à contagem de funcionários ativos
          const response = await request(app)
              .post('/api/v1/headcount')
              .send({ startDate, endDate, leaderEmail });
  
          // Verifica se o status da resposta é 200 (OK)
          expect(response.status).to.equal(200);
          // Verifica se a contagem de funcionários é um número
          expect(response.body.headcount).to.be.a('number');
          // Verifica se o array de funcionários ativos é um array
          expect(response.body.activeEmployees).to.be.an('array');
  
          // Faz uma solicitação GET para a rota "/api/v1/employees"
          const employeesResponse: any = await request(app).get('/api/v1/employees');
  
          // Define os períodos de início e fim
          const start = new Date(startDate);
          const end = new Date(endDate);
  
          const startOfMonthEmployees = employeesResponse._body.filter((employee: { hireDate: string | number | Date; terminationDate: string | number | Date; leaderEmail: string; }) => {
              const hireDate = new Date(employee.hireDate);
              const terminationDate = employee.terminationDate ? new Date(employee.terminationDate) : null;
  
              return (
                  employee.leaderEmail === leaderEmail &&
                  hireDate <= start &&
                  (terminationDate == null || terminationDate > start)
              );
          });
  
          const endOfMonthEmployees = employeesResponse._body.filter((employee: { hireDate: string | number | Date; terminationDate: string | number | Date; leaderEmail: string; }) => {
              const hireDate = new Date(employee.hireDate);
              const terminationDate = employee.terminationDate ? new Date(employee.terminationDate) : null;
  
              return (
                  employee.leaderEmail === leaderEmail &&
                  hireDate <= end &&
                  (terminationDate == null || terminationDate > end)
              );
          });
  
          // Agora o headcount manual é a média dos funcionários ativos no início e final do mês
          const manualHeadcount = (startOfMonthEmployees.length + endOfMonthEmployees.length) / 2;
  
          expect(response.body.headcount).to.equal(manualHeadcount);
      });
  });
});
  

  it('gets turnover for a period', async () => {
    const startDate = '2020-01-17';
    const endDate = '2021-10-31';
    const leaderEmail = 'daniellewinters@kpis.tech';


    // Faz uma solicitação POST para a rota correspondente à taxa de rotatividade
    const response = await request(app)
      .post('/api/v1/turnover')
      .send({ startDate, endDate, leaderEmail });

    // Verifica se o status da resposta é 200 (OK)
    expect(response.status).to.equal(200);
    // Verifica se o array de funcionários demitidos é um array
    expect(response.body.employeesFired).to.be.an('array');
    // Verifica se a taxa de rotatividade é um número
    expect(response.body.turnover).to.be.a('number');
  });
});
