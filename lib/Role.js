const db = require('../db/connection');
const cTable = require('console.table');
const Department = require('./Department');

class Role {
  constructor(id, title, salary, department) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department = department;
  }

  // all mysql2 queries are using promise method to work 
  // in conjunction with inquirer prompts
  getAll () {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department FROM role
    LEFT JOIN department ON role.department_id = department.id`;
    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }
  

  add () {
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    const params = [this.title, this.salary, this.department];

    return db.promise().query(sql, params)
  }

  delete () {
    const sql = `DELETE FROM role WHERE id = '${this.id}'`
    return db.promise().query(sql)
    .then( ([rows]) => {
      return true;
    });
  }

}


module.exports = Role;
