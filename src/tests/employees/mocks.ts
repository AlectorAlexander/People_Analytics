interface Employee {
    id: number;
    enrollment: string;
    name: string;
    email: string;
    leaderEmail: string;
    title: string;
    hireDate: Date;
    terminationDate: Date | null;
    status: string;
}

export const mockEmployee: Employee = {
    id: 1,
    enrollment: 'EMP001',
    name: 'John Doe',
    email: 'johndoe@example.com',
    leaderEmail: 'leader1@example.com',
    title: 'Software Engineer',
    hireDate: new Date('2022-01-01'),
    terminationDate: null,
    status: 'ativo',
};

export const mockEmployees: Employee[] = [
    {
        id: 1,
        enrollment: 'EN1',
        name: 'Employee 1',
        email: 'employee1@example.com',
        leaderEmail: 'leader@example.com',
        title: 'Title 1',
        hireDate: new Date('2023-03-20'),
        terminationDate: null,
        status: 'ativo',
    },
    {
        id: 2,
        enrollment: 'EN2',
        name: 'Employee 2',
        email: 'employee2@example.com',
        leaderEmail: 'leader@example.com',
        title: 'Title 2',
        hireDate: new Date('2023-07-12T09:30:00-03:00'),
        terminationDate: new Date('2023-07-31T17:45:00-03:00'),
        status: 'inativo',
    },
    {
        id: 3,
        enrollment: 'EN3',
        name: 'Employee 3',
        email: 'employee3@example.com',
        leaderEmail: 'leader@example.com',
        title: 'Title 3',
        hireDate: new Date('2023-04-25'),
        terminationDate: null,
        status: 'ativo',
    },
    {
        id: 4,
        enrollment: 'EN4',
        name: 'Employee 4',
        email: 'employee4@example.com',
        leaderEmail: 'leader@example.com',
        title: 'Title 4',
        hireDate: new Date('2023-05-01'),
        terminationDate: null,
        status: 'ativo',
    },
    {
        id: 5,
        enrollment: 'EN5',
        name: 'Employee 5',
        email: 'employee5@example.com',
        leaderEmail: 'leader@example.com',
        title: 'Title 5',
        hireDate: new Date('2023-07-14T21:50:57-03:00'),
        terminationDate: null,
        status: 'ativo',
    },
    {
        id: 6,
        enrollment: 'EN6',
        name: 'Employee 6',
        email: 'employee6@example.com',
        leaderEmail: 'leader6@example.com',
        title: 'Title 6',
        hireDate: new Date('2023-07-14T21:50:57.000Z'),
        terminationDate: null,
        status: 'ativo',
    },
    {
        id: 7,
        enrollment: 'EN7',
        name: 'Employee 7',
        email: 'employee7@example.com',
        leaderEmail: 'leader7@example.com',
        title: 'Title 7',
        hireDate: new Date('2023-07-14T21:50:57.000Z'),
        terminationDate: null,
        status: 'ativo',
    },
    {
        id: 8,
        enrollment: 'EN8',
        name: 'Employee 8',
        email: 'employee8@example.com',
        leaderEmail: 'leader8@example.com',
        title: 'Title 8',
        hireDate: new Date('2023-07-14T21:50:57.000Z'),
        terminationDate: null,
        status: 'ativo',
    },
    {
        id: 9,
        enrollment: 'EN9',
        name: 'Employee 9',
        email: 'employee9@example.com',
        leaderEmail: 'leader9@example.com',
        title: 'Title 9',
        hireDate: new Date('2023-01-10'),
        terminationDate: null,
        status: 'ativo',
    },
    {
        id: 10,
        enrollment: 'EN10',
        name: 'Employee 10',
        email: 'employee10@example.com',
        leaderEmail: 'leader10@example.com',
        title: 'Title 10',
        hireDate: new Date('2023-02-15'),
        terminationDate: null,
        status: 'ativo',
    },
];
