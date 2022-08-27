const db = require('../db/connection');
const cTable = require('console.table');
const Department = require('./Department');

class Role {
  constructor(title, salary, departmentName) {
    this.title = title;
    this.salary = salary;
    this.instance = new Department(departmentName);
    this.department = this.instance.getByName();
  }

  getAll(){
    const sql = `SELECT * FROM role`;
    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }

  add(){
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES ('${this.title}', '${this.salary}', '${this.department.id}')`;
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
