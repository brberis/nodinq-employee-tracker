const inquirer = require('inquirer');
const Department = require('../Department');
const Role = require('../Role');
const menu = require('./menu');

function viewRolesMenu () {
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
              'Main Menu'
            ]
  }])
  .then(({manageRole}) => {
    switch (manageRole) {
      case 'Add':
        addRoleMenu();
        break;
      case 'Delete':
        console.clear();
        deleteRole();
        break;
      case 'Main Menu':
        console.clear();
        menu.mainMenu();
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
          if (!isNaN(salaryInput)) {
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
        choices: departments.map(x => {return x.id + ' ' + x.name}),
      }])
    .then(({title, salary, department}) => {
      const [departmentId] = department.split(' ');
      role = new Role(null, title, salary, departmentId);
      role.add();
      console.clear();
      viewRolesMenu();
      console.table('Role added! \n');
    })
  })
}


function deleteRole () {
  let role = new Role();
  role.getAll()
  .then(roles => {    
    inquirer
    .prompt([
    {
      type: 'list',
      name: 'deleteRole',
      message: `Please select a rol to delete`,
      choices: roles.map(x => {return x.id + ' ' + x.title}),
    }])
    .then(({deleteRole}) => {
      const [roleId] = deleteRole.split(' ');
      role = new Role(roleId);
      role.delete()
      .then(result => {
        if (result) {
          console.clear();
          console.log('Role deleted! \n');
          viewRolesMenu();
        }else{
          console.log('Database error');
        }
      })
    })
    
  })
  
}

module.exports = { viewRolesMenu, addRoleMenu};


