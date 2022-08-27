const db = require('../db/connection');
const cTable = require('console.table');

class Employee {
  constructor(
              id,
              firstName, 
              lastName, 
              roleId,
              managerId, 
              ) 
              {
                this.id = id;
                this.firstName = firstName;
                this.lastName = lastName;
                this.roleId = roleId;
                this.managerId = managerId;
              }

  getAll () {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
                  department.name AS department, role.title, role.salary, 
                  CONCAT(manager.first_name, ' ', manager.last_name) AS manager  
                  FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id
                  LEFT JOIN role ON employee.role_id = role.id
                  LEFT JOIN department ON role.department_id = department.id`;
    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }

  add () {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${this.firstName}', '${this.lastName}', '${this.roleId}', '${this.managerId}')`;
    return db.promise().query(sql)
  }

  delete () {
    const sql = `DELETE FROM employee WHERE id = '${this.id}'`
    return db.promise().query(sql)
    .then( ([rows]) => {
      return true;
    });
  }

  updateEmployeeRole () {

  } 

}

module.exports = Employee;
