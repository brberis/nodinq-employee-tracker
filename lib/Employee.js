

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






  viewEmployees(){

  }

  addEmployee(){
  
  }

  updateEmployeeRole(){

  } 

  quit(){
    console.log(`Thanks`);
  }
}

module.exports = Employee;
