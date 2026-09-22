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

O backend está organizado em camadas:

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
