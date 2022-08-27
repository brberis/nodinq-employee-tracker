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
      let employeeManagers = managers.map(x => {return x.id + ' ' + x.first_name + ' ' + x.last_name});
      employeeManagers.unshift('> None');
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
        },
        {
          type: 'list',
          name: 'manager',
          message: `Who is the empo\loyee's manager?`,
          choices: employeeManagers
        }]
      )
      .then(({firstName, lastName, role, manager}) => {
        let [roleId] = role.split(' ');
        let [managerId] = manager.split(' ');
        if(managerId === '>') {
          managerId = null;
        } 
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
  console.clear();
  let role = new Role();
  role.getAll()
  .then(roles => {
    let employee = new Employee();
    employee.getAll()
    .then(employees => {
      inquirer
      .prompt([
      {
        type: 'list',
        name: 'employeeRole',
        message: `Which employee's role do you want to update?`,
        choices: employees.map(x => {return x.id + ' ' + x.first_name + ' ' + x.last_name})
      },{
        type: 'list',
        name: 'role',
        message: `Which role do you want to assign the selected employee?`,
        choices: roles.map(x => {return x.id + ' ' + x.title})
      }])
      .then(({employeeRole, role}) => {
        let [roleId] = role.split(' ');
        let [employeeId] = employeeRole.split(' ');
        let current = new Employee(employeeId);
        current.get()
        .then((current) => {
          current = current[0];
          let employee = new Employee(current.id, current.first_name, current.last_name, roleId, current.manager_id);
          employee.update()
          .then(() => {
            console.clear;
            console.log(`The employee's role was updated!`);
            viewEmployeesMenu();
          })
        })
      }) 
    })
  })   
} 


function updateEmployeeManagerMenu () {
  console.clear();
  let employee = new Employee();
  employee.getAll()
  .then(employees => {
    const employeeSelection = employees.map(x => {return x.id + ' ' + x.first_name + ' ' + x.last_name})
    inquirer
    .prompt(
    {
      type: 'list',
      name: 'employeeManager',
      message: `Which employee's manager do you want to update?`,
      choices: employeeSelection
    })
    .then(({employeeManager}) => {
      const [employeeId] = employeeManager.split(' ');
      const managers = employees.filter((item) => item.id !== Number(employeeId));
      const managersSelection = managers.map(x => {return x.id + ' ' + x.first_name + ' ' + x.last_name});
      inquirer
      .prompt(
      {
        type: 'list',
        name: 'manager',
        message: `Which manager do you want to assign the selected employee?`,
        choices: managersSelection
      })
      .then(({manager}) => {
        let [managerId] = manager.split(' ');
        let current = new Employee(employeeId);
        current.get()
        .then((current) => {
          current = current[0];
          let employee = new Employee(current.id, current.first_name, current.last_name, current.rol_id, managerId);
          employee.update()
          .then(() => {
            console.clear;
            console.log(`The employee's manager was updated!`);
            viewEmployeesMenu();
          })
        })
      }) 
    }) 
  })
} 

module.exports = { viewEmployeesMenu }