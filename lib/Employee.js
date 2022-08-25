const inquirer = require('inquirer');
const Department = require('./Department');
const Role = require('./Role');

class Employee {
  constructor(id, 
              firstName, 
              LastName, 
              managerId, 
              ) 
              {
                this.department = new Department();
                this.role = new Role();
                this.id = id;
                this.firstName = firstName;
                this.LastName = LastName;
                this.managerId = managerId;
              }


initializeApp() {
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
          this.role.viewAllRoles();
          break;
        case 'Add Role':
          this.role.addRole();
          break;
        case 'View All Departments':
          this.department.viewAllDepartments();
          break;
        case 'Add Department':
          this.department.addDepartment();
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

  viewEmployees(){

  }

  addEmployee(){
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

  updateEmployeeRole(){
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

  quit(){
    console.log(`Thanks`);
  }
}


module.exports = Employee;
