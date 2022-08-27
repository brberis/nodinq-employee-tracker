const inquirer = require('inquirer');
const { viewRolesMenu } = require('./role');
const { viewDepartmentsMenu } = require('./department');
const { viewEmployeesMenu } = require('./employee');

// to avoid circular dependency
exports.mainMenu = mainMenu;

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
    choices: ['View Employees', 
              'View Roles',  
              'View Departments', 
              'Quit' ],
    default: 'View All Employee',
  }])
  .then(({menuSelection}) => {
    switch (menuSelection) {
      case 'View Employees':
        console.clear();
        viewEmployeesMenu();
        break;
      case 'View Roles':
        console.clear();
        viewRolesMenu();
        break;
      case 'View Departments':
        console.clear();
        viewDepartmentsMenu();
        break;
      case 'Quit':
        quit();
        break;
    }
  })
}

function quit () {
  console.log(`
  Thanks for using Nodinq Employee Tracker

  `)
}


module.exports = { initializeApp };

