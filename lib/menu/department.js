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

// menu options department section
function manageDepartmentMenu (budgetView) {

  if (!budgetView) {
    departmentMenu = [
      'Budget by Department',
      'Add', 
      'Delete', 
      'Main Menu'
    ];  
  } else {
    departmentMenu = [ 
      'Main Menu'
    ]; 
  }

  inquirer
  .prompt([
  {
    type: 'list',
    name: 'manageDepartment',
    message: `Please select an option for departments`,
    choices: departmentMenu
  }])
  .then(({manageDepartment}) => {
    switch (manageDepartment) {
      case 'View All Departments':
        console.clear();
        viewDepartmentsMenu();
        break;
      case 'Budget by Department':
        console.clear();
        departmentBudgetMenu();
        break;
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

// total utilization budget table
function departmentBudgetMenu () {
  let department = new Department();
  department.getUtilizedBudget()
  .then( utilized => {
    console.log(`
    =====================================
     Total utilized budget by department
    =====================================
    `)
    let department = new Department();
    department.getTotalBudget()
    .then( total => {
      // let rows = utilized.map((item, i) => Object.assign({}, item, total[i]));
      let merged = [];

      // join two tables total and utilized
      for(let i=0; i<utilized.length; i++) {
        merged.push({
        ...utilized[i], 
        ...(total.find((x) => x.id === utilized[i].id))}
        );
      }

      // adding ratio column
      total.forEach(dept => {
        const index = merged.findIndex(x => {
          if (x.id === dept.id) {
            return true;
          }
          return false;
        });
                
        if (index === -1) {
          merged.push({...dept, utilized: 0} );
        }
      })
      budget = [];
      merged.map(x => {
        let ratio = Math.round((x.utilized / x.total) * 100);
        budget.push({...x, ratio: ratio + '%'} );

      })
      console.table(budget);

      })
      .then( () => {
        manageDepartmentMenu(true);
      })  
  })  
}

// delete department menu
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
          viewDepartmentsMenu(false);
        }else{
          console.log('Database error');
        }
      })
    })
    
  })
  
}

// add department menu
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
    viewDepartmentsMenu(false);
    console.table('Department added! \n');
  })
}

module.exports = { viewDepartmentsMenu, addDepartmentMenu, departmentBudgetMenu }