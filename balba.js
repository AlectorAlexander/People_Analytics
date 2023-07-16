const employeesArray = [];

for (let i = 0; i < 10; i++) {
    const employee = {
        id: i + 1,
        enrollment: `EN${i + 1}`,
        name: `Employee ${i + 1}`,
        email: `employee${i + 1}@example.com`,
        leaderEmail: `leader${i + 1}@example.com`,
        title: `Title ${i + 1}`,
        hireDate: (new Date()).toString(),
        terminationDate: null,
        status: 'active',
    };

    employeesArray.push(employee);
}

console.log(employeesArray);