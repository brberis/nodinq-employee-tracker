const db = require('../db/connection');
const cTable = require('console.table');
const Department = require('./Department');

class Role {
  constructor(title, salary, department) {
    this.title = title;
    this.salary = salary;
    this.department = department;
  }

  getAll(){


    const sql = `SELECT role.id, role.title, role.salary, department.name AS department FROM role
    LEFT JOIN department ON role.department_id = department.id`;
    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }

  add(){
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES ('${this.title}', '${this.salary}', '${this.department}')`;
    return db.promise().query(sql)
  }

  delete(){
    const sql = `DELETE FROM role WHERE title = '${this.title}'`
    return db.promise().query(sql)
    .then( ([rows]) => {
      return true;
    });
  }

}


module.exports = Role;
