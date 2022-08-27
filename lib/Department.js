const db = require('../db/connection');
const cTable = require('console.table');

class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  getAll () {
    const sql = `SELECT * FROM department`;
    return db.promise().query(sql)
    .then( ([rows]) => {
      return rows;
    });
  }

  // getByName () {
  //   const sql = `SELECT * FROM department WHERE name = '${this.name}'`;
  //   return db.promise().query(sql)
  //   .then( ([rows]) => {
  //     return rows;
  //   });
  // }

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