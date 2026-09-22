# People Analytics

API REST desenvolvida em TypeScript para análise de dados de pessoas e estrutura organizacional.

O projeto utiliza dados de uma folha de pagamento em CSV para armazenar informações de colaboradores, mapear relações entre líderes e subordinados e disponibilizar métricas como headcount e turnover.

## Tecnologias

- TypeScript
- Node.js
- Express
- PostgreSQL
- Sequelize
- Sequelize CLI
- Mocha
- Chai
- Supertest
- ESLint

## Funcionalidades

- Importação de colaboradores a partir de arquivo CSV
- Persistência de funcionários em PostgreSQL
- Relacionamento entre líderes e subordinados
- Consulta de funcionário por e-mail
- Listagem de funcionários
- Cálculo de headcount por período
- Cálculo de turnover por período
- Cálculo de métricas considerando subordinados indiretos
- Consulta de líderes diretos e indiretos
- Consulta de subordinados diretos e indiretos
- Testes automatizados da API

## Estrutura do projeto

```text
src/
├── controller/
├── database/
│   ├── config/
│   ├── migrations/
│   └── seeders/
├── model/
├── services/
├── tests/
└── app.ts
```

### Controllers

Responsáveis por receber as requisições HTTP e retornar as respostas da API.

### Services

Concentram as regras de negócio, incluindo os cálculos de headcount, turnover e navegação pela hierarquia organizacional.

### Models

Representam as entidades persistidas no banco utilizando Sequelize.

### Database

Contém configuração de conexão, migrations e seeders.

## Modelo de dados

### Employees

Armazena informações dos colaboradores:

- matrícula
- nome
- e-mail
- gestor
- cargo
- data de admissão
- data de desligamento
- status

### Leadership

Representa a relação entre gestores e subordinados.

```text
leaderEmail -> subordinateEmail
```

A partir dessas relações, a API consegue percorrer a estrutura organizacional e identificar subordinados e líderes em diferentes níveis.

## Métricas

### Headcount

Calcula a quantidade média de funcionários ativos em determinado período.

O cálculo considera os colaboradores ativos no início e no final do período analisado.

### Turnover

Calcula a proporção de desligamentos em relação ao headcount do período.

Também existem versões dos cálculos que percorrem a hierarquia e consideram subordinados indiretos.

## Endpoints

Base URL:

```text
/api/v1
```

### Funcionários

```http
GET /employees
```

Retorna todos os funcionários cadastrados.

```http
GET /employee/:email
```

Retorna um funcionário pelo e-mail.

### Headcount

```http
POST /headcount
```

Exemplo de body:

```json
{
  "startDate": "2021-01-01",
  "endDate": "2021-12-31",
  "leaderEmail": "leader@example.com"
}
```

```http
POST /headcountForIndirects
```

Calcula o headcount incluindo subordinados indiretos.

### Turnover

```http
POST /turnover
```

Exemplo:

```json
{
  "startDate": "2021-01-01",
  "endDate": "2021-12-31",
  "leaderEmail": "leader@example.com"
}
```

```http
POST /turnoverForIndirects
```

Calcula turnover considerando também a estrutura indireta de subordinados.

### Estrutura organizacional

```http
GET /subordinates/:email
```

Retorna subordinados diretos.

```http
GET /indirectSubordinates/:email
```

Retorna subordinados diretos e indiretos.

```http
GET /leaders/:email
```

Retorna líderes diretos.

```http
GET /indirectLeaders/:email
```

Retorna a cadeia de liderança acima do colaborador.

## Importação dos dados

O projeto possui um seeder que lê o arquivo:

```text
FolhaDePagamento.csv
```

Os dados do CSV são utilizados para popular as tabelas `employees` e `leadership`.

Formato esperado:

```csv
matrícula,status,nome,email,email do gestor,data de admissão,data de rescisão,cargo
```

## Configuração

Clone o repositório:

```bash
git clone https://github.com/AlectorAlexander/People_Analytics.git
```

Entre no diretório:

```bash
cd People_Analytics
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` com as configurações do PostgreSQL:

```env
PGHOST=
PGDATABASE=
PGUSER=
PGPASSWORD=
ENDPOINT_ID=
SSL_CERT_PATH=
```

A aplicação utiliza conexão PostgreSQL com SSL.

## Banco de dados

Execute as migrations:

```bash
npm run migrate
```

Popule o banco utilizando o CSV:

```bash
npm run seed
```

Para desfazer a última migration:

```bash
npm run migrate:down
```

Para desfazer o seed:

```bash
npm run seed:down
```

## Executando o projeto

Modo de desenvolvimento:

```bash
npm run dev
```

Execução normal:

```bash
npm start
```

Por padrão, a API utiliza a porta `3000`, podendo ser alterada através da variável de ambiente `PORT`.

## Testes

Os testes utilizam:

- Mocha
- Chai
- Supertest

Execute com:

```bash
npm test
```

A suíte cobre endpoints relacionados a funcionários, headcount e turnover.

## Objetivo

Este projeto foi desenvolvido para praticar construção de APIs backend com TypeScript, modelagem de dados relacionais, Sequelize, PostgreSQL, arquitetura em camadas e testes de integração.

Além da parte técnica, o domínio explora problemas de People Analytics, como estrutura organizacional, headcount e turnover.

## Autor

**Alector Alexander**

- GitHub: https://github.com/AlectorAlexander
- LinkedIn: https://www.linkedin.com/in/alector-alexander/
