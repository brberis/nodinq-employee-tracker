const inquirer = require('inquirer');

class Role {
  constructor(id, title, salary, departmentId) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

  viewAllRoles(){

  }

  addRole(){
    inquirer
    .prompt([
      {
      type: 'text',
      name: 'name',
      message: 'What is the name of the role?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the name!');
          return false;
        }
      }
    },{
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
    },{
        type: 'list',
        name: 'department',
        message: 'Which department does the role belong to?',
        choices: ['Engineering', 
                  'Finance', 
                  'Legal', 
                  'Sales', 
                  'Service'],
        default: 'Engineering',
    }]
    )
    .then(({name}) => {
      console.log(`Added ${name} to the database`);
    })   
  }

}


module.exports = Role;
