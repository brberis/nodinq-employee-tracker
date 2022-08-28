const inquirer = require('inquirer');
const { viewRolesMenu, addRoleMenu } = require('./role');
const { viewDepartmentsMenu, addDepartmentMenu, departmentBudgetMenu } = require('./department');
const { viewEmployeesMenu, addEmployeeMenu, updateEmployeeRoleMenu, updateEmployeeManagerMenu } = require('./employee');

// workarwond to avoid circular dependency - dont move to bottom
exports.mainMenu = mainMenu;

// main menu and shortcuts required in the mockup
function mainMenu () {
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

    console.log(`
    =======================
     Main Menu (Shortcuts)
    =======================
    `)

  inquirer
  .prompt([
  {
    type: 'list',
    name: 'menuSelection',
    message: 'What would you like to do?',
    choices: ['View All Employees',
              'Add Employee', 
              'Update Employee Manager', 
              'Update Employee Role', 
              'View All Roles',
              'Add Role', 
              'View All Departments', 
              'Add Department', 
              'Budget by Department',
              'Exit' ],
    default: 'View All Employees',
  }])
  .then(({menuSelection}) => {
    switch (menuSelection) {
      case 'View All Employees':
        console.clear();
        viewEmployeesMenu(false);
        break;
      case 'Add Employee':
        console.clear();
        addEmployeeMenu();
        break;
      case 'Update Employee Manager':
        console.clear();
        updateEmployeeManagerMenu();
        break;
      case 'Update Employee Role':
        console.clear();
        updateEmployeeRoleMenu();
        break;
      case 'Budget by Department':
        console.clear();
        departmentBudgetMenu();
        break;
      case 'View All Roles':
        console.clear();
        viewRolesMenu();
        break;
      case 'Add Role':
        console.clear();
        addRoleMenu();
        break;
      case 'View All Departments':
        console.clear();
        viewDepartmentsMenu(false);
        break;
      case 'Add Department':
        console.clear();
        addDepartmentMenu(false);
        break;
      case 'Exit':
        quit();
    }
  })
}

function quit () {
  console.log(`
  Thanks for using Nodinq Employee Tracker

  `);
}


