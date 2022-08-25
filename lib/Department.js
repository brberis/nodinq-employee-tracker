class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  viewAllDepartments(){

  }

  addDepartment(){
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
      console.log(`Added ${name} to the database`);
    })   
  }

}

module.exports = Department;