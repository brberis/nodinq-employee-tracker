const inquirer = require('inquirer');

class Employee {
  constructor(id, firstName, LastName, managerId) {
    this.id = id;
    this.firstName = firstName;
    this.LastName = LastName;
    this.managerId = managerId;
  }


initializeApp() {
  console.log(`
  =============================
   Employee Manager Ver. 1.0.0
  =============================
   `);
  this.mainMenu();
}

  // option menu add or finish
  mainMenu() {
    inquirer
    .prompt([
    {
      type: 'list',
      name: 'menuSelection',
      message: 'What would you like to do?',
      choices: ['View All Employee', 
                'Add Employee', 
                'Update Employee Role', 
                'View All Roles', 
                'Add Role', 
                'View All Departments', 
                'Add Department', 
                'Quit' ],
      default: 'View All Employee',
    }])
    .then(({menuSelection}) => {
      switch (menuSelection) {
        case 'View All Employee':
          this.viewEmployees();
          break;
        case 'Add Employee':
          this.addEmployee();
          break;
        case 'Update Employee Role':
          this.updateEmployeeRole();
          break;
        case 'View All Roles':
          this.VireAllRoles();
          break;
        case 'Add Role':
          this.addRole();
          break;
        case 'View All Departments':
          this.viewAllDepartments();
          break;
        case 'Add Department':
          this.addDepartment();
          break;
        case 'Quit':
          this.quit();
          break;
        default:
          // create html format
          this.html = generateTeamPage(this.employees);
          this.createFile();
      }
    })
  }
}


module.exports = Employee;
