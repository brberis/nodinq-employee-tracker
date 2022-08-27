const inquirer = require('inquirer');
const Employee = require('./Employee');
const Department = require('./Department');
const Role = require('./Role');

function initializeApp () {
  console.clear();
  console.log(`
   _____                 _                        
  | ____|_ __ ___  _ __ | | ___  _   _  ___  ___  
  |  _| | '_ ' _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\ 
  | |___| | | | | | |_) | | (_) | |_| |  __/  __/ 
  |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| 
   _____          |_|  _         |___/            
  |_   _| __ __ _  ___| | _____ _ __              
    | || '__/ _' |/ __| |/ / _ \\ '__|             
    | || | | (_| | (__|   <  __/ |                
    |_||_|  \\__,_|\\___|_|\\_\\___|_|     Ver. 1.0.0

   `);
  mainMenu(true);
}

function mainMenu (first) {
  if (!first){
    console.log(`
    ===========
     Main Menu
    ===========
    `)
  }

  inquirer
  .prompt([
  {
    type: 'list',
    name: 'menuSelection',
    message: 'What would you like to do?',
    choices: ['View All Employee', 
              'Add Employee', 
              'Update Employee Role', 
              'View Roles',  
              'View Departments', 
              'Quit' ],
    default: 'View All Employee',
  }])
  .then(({menuSelection}) => {
    switch (menuSelection) {
      case 'View All Employee':
        console.clear();
        viewEmployeesMenu();
        break;
      case 'Add Employee':
        console.clear();
        addEmployeeMenu();
        break;
      case 'Update Employee Role':
        console.clear();
        updateEmployeeRoleMenu();
        break;
      case 'View Roles':
        console.clear();
        viewAllRolesMenu();
        break;
      case 'View Departments':
        console.clear();
        viewAllDepartmentsMenu();
        break;
      case 'Quit':
        quit();
        break;
    }
  })
}

function addEmployeeMenu () {
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
    },{
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
    },{
        type: 'list',
        name: 'role',
        message: `What is the employee's role?`,
        choices: ['Sales Lead', 
                  'Salesperson', 
                  'Lead Engineer', 
                  'Acconut Manager', 
                  'Accountant',
                  'Legal Team Lead',
                  'Lawyer',
                  'Customer Service'
                ],
        default: 'Sales Lead',
    },{
      type: 'list',
      name: 'manager',
      message: `Who is the empo\loyee's manager?`,
      choices: ['John Doe', 
                'Mike Chan', 
                'Ashley Rodriguez', 
                'Kevin Tupik', 
                'Kunsl Singh',
                'Malia Brown'
              ]
    }]
  )
  .then(({firstName, LastName}) => {
    console.log(`Added ${firstName} ${LastName} to the database`);
  }) 
}

function viewAllDepartmentsMenu () {
  let department = new Department();
  department.getAll()
  .then( rows => {
    console.log(`
    =================
     All Departments
    =================
    `)
    console.table(rows);
  })
  .then( () => {
    manageDepartmentMenu();
  })  
}

function manageDepartmentMenu () {
  inquirer
  .prompt([
  {
    type: 'list',
    name: 'manageDepartment',
    message: `Please select an option for departments`,
    choices: ['Add', 
              'Delete', 
              'Main menu'
            ]
  }])
  .then(({manageDepartment}) => {
    switch (manageDepartment) {
      case 'Add':
        addDepartmentMenu();
        break;
      case 'Delete':
        console.clear();
        deleteDepartment();
        break;
      case 'Main menu':
        console.clear();
        mainMenu();
        break;
    }}
  )
}

function deleteDepartment () {
  let department = new Department();
  department.getAll()
  .then(departments => {
    inquirer
    .prompt([
    {
      type: 'list',
      name: 'deleteDepartment',
      message: `Please select a department to delete`,
      choices: departments
    }])
    .then(({deleteDepartment}) => {
      department = new Department(deleteDepartment);
      department.delete()
      .then(result => {
        if (result) {
          console.clear();
          console.log('Department deleted! \n');
          viewAllDepartmentsMenu();
        }else{
          console.log('Database error');
        }
      })
    })
    
  })
  
}

function addDepartmentMenu () {
  inquirer
  .prompt({
    type: 'text',
    name: 'name',
    message: 'What is the name of the department?',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter the name!');
        return false;
      }
    }
  })
  .then(({name}) => {
    department = new Department(name);
    department.add();
    console.clear();
    viewAllDepartmentsMenu();
    console.table('Department added! \n');
  })
}

function viewAllRolesMenu () {
  let role = new Role();
  role.getAll()
  .then( rows => {
    console.log(`
    ===========
     All Roles
    ===========
    `)
    console.table(rows);
  })
  .then( () => {
    manageRoleMenu();
  })  
}

function manageRoleMenu () {
  inquirer
  .prompt([
  {
    type: 'list',
    name: 'manageRole',
    message: `Please select an option for roles`,
    choices: ['Add', 
              'Delete', 
              'Main menu'
            ]
  }])
  .then(({manageRole}) => {
    switch (manageRole) {
      case 'Add':
        addRoleMenu();
        break;
      case 'Delete':
        deleteoRole();
        break;
      case 'Main menu':
        console.clear();
        mainMenu();
        break;
    }}
  )
}

function addRoleMenu () {
  let department = new Department();
  department.getAll()
  .then(departments => {
    inquirer
    .prompt([
      {
        type: 'text',
        name: 'title',
        message: 'What is the title of the role?',
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log('Please enter the title!');
            return false;
          }
        }
      },
      {
        type: 'text',
        name: 'salary',
        message: 'What is the salary of the role?',
        validate: salaryInput => {
          if (salaryInput) {
            return true;
          } else {
            console.log('Please enter the salary!');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'department',
        message: `Which department does the role belong to?`,
        choices: departments
      }])
    .then(({title, salary, department}) => {
      departmentInstance = new Department(department);
      departmentInstance.getByName()
      .then((department) => {
        role = new Role(title, salary, department[0].id);
        role.add();
        console.clear();
        viewAllRolesMenu();
        console.table('Role added! \n');
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

// function addRoleMenu () {
//   inquirer
//   .prompt([
//     {
//       type: 'text',
//       name: 'name',
//       message: 'What is the name of the role?',
//       validate: nameInput => {
//         if (nameInput) {
//           return true;
//         } else {
//           console.log('Please enter the name!');
//           return false;
//         }
//       }
//     },{
//         type: 'text',
//         name: 'salary',
//         message: 'What is the salary of the role?',
//         validate: salaryInput => {
//           if (salaryInput) {
//             return true;
//           } else {
//             console.log('Please enter the salary!');
//             return false;
//           }
//         }
//     },{
//         type: 'list',
//         name: 'department',
//         message: 'Which department does the role belong to?',
//         choices: ['Engineering', 
//                   'Finance', 
//                   'Legal', 
//                   'Sales', 
//                   'Service'],
//         default: 'Engineering',
//     }]
//     )
//     .then(({name}) => {
//       console.log(`Added ${name} to the database`);
//     })   
// }

function quit () {
  console.log(`
  Thanks for using Nodinq Employee Tracker

  `)
}

module.exports = { initializeApp };
