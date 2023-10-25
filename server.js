const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Database connection successful!');
    employee_tracker();
});

function employee_tracker() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'Select and action',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add and employeee', 'Update and employee role', 'Log Out']
        }
    ]).then((answers) => {
        if (answers.prompt === 'View all departments') {
            db.query('SELECT * FROM departments', (err, result) => {
                if (err) throw err;
                console.log("Viewing all departments: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View all roles') {
            db.query('SELECT * FROM role', (err, result) => {
                if (err) throw err;
                console.log("Viewing all roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View all employees') {
            db.query('SELECT * FROM employee', (err, result) => {
                if (err) throw err;
                console.log("Viewing all employees: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add a department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'Name the new department',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please add a department');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO departments (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`);
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Add a role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {

                        type: 'input',
                        name: 'role',
                        message: 'Name the role',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please add a role');
                                return false;
                            }
                        }
                    },
                    {

                        type: 'input',
                        name: 'salary',
                        message: 'State the pay grade',
                        validate: payInput => {
                            if (payInputInput) {
                                return true;
                            } else {
                                console.log('Please add a pay grade');
                                return false;
                            }
                        }

                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department does this role belong in?',
                        choices: () => {
                            const array = [];
                            for (const i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    for (const item of result) {
                        if (item.name === answers.department) {
                            const department = item;
                        }
                    }

                    db.query(`INSERT INTO role (title, pay, department_id) VALUES (?, ?, ?,)`, [answers.role, answers.pay, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`);
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Add and employee') {
            db.query(`SELECT * FROM employee`, role, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter employee first name',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Add a first name please');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter employee last name',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Add a last name please');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'State employee role',
                        choices: () => {
                            const array = [];
                            for (const item of result) {
                                array.push(item.title);
                            }
                            const newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Designate employee manager',
                        validate: managerInput => {
                            if (managerInputInput) {
                                return true;
                            } else {
                                console.log('Add a manager name please');
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    for (const item of result) {
                        if (item.title === answers.role) {
                            const role = item;
                        }
                    }

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`);
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Update an employee role') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee role to be updated?',
                        choices: () => {
                            const array = [];
                            for (const item of result) {
                                array.push(item.title);
                            }
                            const employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Describe the new role',
                        choices: () => {
                            const array = [];
                            for (const item of result) {
                                array.push(item.title);
                            }
                            const newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    for (const item of result) {
                        if (item.last_name === answers.employee) {
                            const name = item;
                        }
                    }

                    for (const item of result) {
                        if (item.titel === answers.role) {
                            const role = item;
                        }
                    }

                    db.query(`UPDATE employee SET ? WHERE ?`, [{ role_id: role }, {last_name: name }], (err, reslut) => {
                       if (err) throw err;
                       console.log(`Updated ${answers.employee} role to the database.`);
                       employee_tracker(); 
                    });
                });
            });
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Thank you, see you next time!");
        }
    });
}