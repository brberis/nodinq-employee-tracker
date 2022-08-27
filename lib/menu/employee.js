const inquirer = require('inquirer');
const Employee = require('../Employee');
const Role = require('../Role');
const menu = require('./menu');

function viewEmployeesMenu () {
  let employee = new Employee();
  employee.getAll()
  .then( rows => {
    console.log(`
    ===============
     All Employees
    ===============
    `)
    console.table(rows);
  })
  .then( () => {
    manageEmployeeMenu();
  })  
}

function manageEmployeeMenu () {
  inquirer
  .prompt([
  {
    type: 'list',
    name: 'manageEmployee',
    message: `Please select an option for employees`,
    choices: ['Add', 
              'Delete', 
              'Update Employee Role',
              'Update Employee Manager',
              'Main Menu'
            ]
  }])
  .then(({manageEmployee}) => {
    switch (manageEmployee) {
      case 'Add':
        addEmployeeMenu();
        break;
      case 'Delete':
        console.clear();
        deleteEmployeeMenu();
        break;
      case 'Update Employee Role':
        console.clear();
        updateEmployeeRoleMenu();
        break;
      case 'Update Employee Manager':
        console.clear();
        updateEmployeeManagerMenu();
        break;
      case 'Main Menu':
        console.clear();
        mainMenu();
        break;
    }}
  )
}

function addEmployeeMenu () {
  console.clear();
  let role = new Role();
  role.getAll()
  .then(roles => {
    let manager = new Employee();
    manager.getAll()
    .then(managers => {
      inquirer
      .prompt([
        {
          type: 'text',
          name: 'firstName',
          message: `What is the employee's first name?`,
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter first name!');
              return false;
            }
          }
        },
        {
          type: 'text',
          name: 'lastName',
          message: `What is the employee's last name?`,
          validate: lastNameInput => {
            if (lastNameInput) {
              return true;
            } else {
              console.log('Please enter last name!');
              return false;
            }
          }
        },
        {
          type: 'list',
          name: 'role',
          message: `What is the employee's role?`,
          choices: roles.map(x => {return x.id + ' ' + x.title}),
          default: 'Sales Lead',
        },
        {
          type: 'list',
          name: 'manager',
          message: `Who is the empo\loyee's manager?`,
          choices: managers.map(x => {return x.id + ' ' + x.first_name + ' ' + x.last_name})
        }]
      )
      .then(({firstName, lastName, role, manager}) => {
        const [roleId] = role.split(' ');
        const [managerId] = manager.split(' ');
        let employee = new Employee(null, firstName, lastName, roleId, managerId);
        employee.add()
        .then((employee) => {
          console.log(`Added ${employee.firstName} ${employee.LastName} to the database`);
          viewEmployeesMenu();
        })
      }) 
    })
  })
}

function deleteEmployeeMenu () {
  let employee = new Employee();
  employee.getAll()
  .then(employees => {    
    inquirer
    .prompt([
    {
      type: 'list',
      name: 'deleteEmployee',
      message: `Please select an employee to delete`,
      choices: employees.map(x => {return x.id + ' ' + x.first_name + ' ' + x.last_name})
    }])
    .then(({deleteEmployee}) => {
      const [employeeId] = deleteEmployee.split(' ');
      employee = new Employee(employeeId);
      employee.delete()
      .then(result => {
        if (result) {
          console.clear();
          console.log('Employee deleted! \n');
          viewEmployeesMenu();
        }else{
          console.log('Database error');
        }
      })
    })
    
  })
  
}


function updateEmployeeRoleMenu () {
  inquirer
  .prompt([
  {
    type: 'list',
    name: 'employeeRoleUpdate',
    message: `Which employee's role do you want to update?`,
    choices: ['Sales Lead', 
              'Salesperson', 
              'Lead Engineer', 
              'Acconut Manager', 
              'Accountant',
              'Legal Team Lead',
              'Lawyer',
              'Customer Service'
            ]
  },{
    type: 'list',
    name: 'role',
    message: `Which role do you want to assign the selected employee?`,
    choices: ['Sales Lead', 
              'Salesperson', 
              'Lead Engineer', 
              'Acconut Manager', 
              'Accountant',
              'Legal Team Lead',
              'Lawyer',
              'Customer Service'
            ]
  }])
  .then(({name}) => {
    console.log(`Updated employee's role`);
    mainMenu();
  })    
} 

module.exports = { viewEmployeesMenu }