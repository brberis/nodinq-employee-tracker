const db = require('../db/connection');
const cTable = require('console.table');

class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // all mysql2 queries are using promise method to work 
  // in conjunction with inquirer prompts
  getAll () {
    const sql = `SELECT * FROM department`;
    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }

  // sum all employer salaries in each department
  getUtilizedBudget () {
    const sql = `SELECT department.id, department.name AS department, 
    SUM(utilized.salary) AS utilized FROM department 
    LEFT JOIN role utilized ON department.id = utilized.department_id
    INNER JOIN employee ON employee.role_id = utilized.id GROUP BY department.id`;

    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }

  // get sum all total available budget by role in each department
  getTotalBudget () {
    const sql = `SELECT department.id, department.name AS department, 
    SUM(utilized.salary) AS total FROM department 
    LEFT JOIN role utilized ON department.id = utilized.department_id
    LEFT JOIN employee ON employee.role_id = utilized.id GROUP BY department.id`;

    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }

  add () {
    const sql = `INSERT INTO department (name)
    VALUES ('${this.name}')`;
    return db.promise().query(sql)
  }

  delete () {
    const sql = `DELETE FROM department WHERE id = '${this.id}'`
    return db.promise().query(sql)
    .then( ([rows]) => {
      return true;
    });
  }

}

module.exports = Department;