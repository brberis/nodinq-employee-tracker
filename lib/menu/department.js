const inquirer = require('inquirer');
const Department = require('../Department');
const menu = require('./menu');

function viewDepartmentsMenu () {
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
              'Main Menu'
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
      case 'Main Menu':
        console.clear();
        menu.mainMenu();
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
      choices: departments.map(x => {return x.id + ' ' + x.name}),
    }])
    .then(({deleteDepartment}) => {
      const [departmentId] = deleteDepartment.split(' ');
      department = new Department(departmentId);
      department.delete()
      .then(result => {
        if (result) {
          console.clear();
          console.log('Department deleted! \n');
          viewDepartmentsMenu();
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
    department = new Department(null, name);
    department.add();
    console.clear();
    viewDepartmentsMenu();
    console.table('Department added! \n');
  })
}

module.exports = { viewDepartmentsMenu }