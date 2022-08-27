const db = require('../db/connection');
const cTable = require('console.table');

class Department {
  constructor(name) {
    this.name = name;
  }

  getAll(){
    const sql = `SELECT * FROM department`;
    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }

  getByName(){
    const sql = `SELECT * FROM department WHERE name = '${this.name}'`;
    return db.promise().query(sql)
    .then( ([row]) => {
      return row;
    });
  }

  add(){
    const sql = `INSERT INTO department (name)
    VALUES ('${this.name}')`;
    return db.promise().query(sql)
  }

  delete(){

    const sql = `DELETE FROM department WHERE name = '${this.name}'`
    return db.promise().query(sql)
    .then( ([rows]) => {
      return true;
    });
  }

}

module.exports = Department;