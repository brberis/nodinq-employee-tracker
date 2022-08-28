
[comment]: <> (This readme was created by Nodinq Readme Generator)
![alt text](https://img.shields.io/badge/License-MIT-brightgreen)
![alt text](https://img.shields.io/badge/Ver.-1.0.0-blue)

# Nodinq Employee Tracker


## Description

NodeJs application to manage database of employees through command line prompts.
It was developed as a proof of concept using InquirerJS, MySQL server and MySQL2 interface.
The application allows to record, display and update tables of Employees, Roles and Departments, display informations using advanced SQL queries and maths operations directly from the database to avoid handcraft coding. The relational schema was designed to maintain a robust data integrity.
Every MySQL2 querty was made utilizing Promise method to work properly with Inquirer JS prompts.

## Screenshot

![alt screenshot](https://github.com/brberis/nodinq-employee-tracker/raw/main/assets/images/web.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [Questions](#questions)

## Installation

To execute this app you need NodeJs. Clone this repo and type `npm install` in the terminal. To run this app type `node index.js`.

### Database Initialization

Install MySQL in your computer and from MySQL CLI run the following commands to create the database and populate it with demo data: 
- `mysql> source db/db.sql` 
- `mysql> source db/schema.sql`
- `mysql> source db/seeds.sql`

## Usage

### Watch this video.

[![Watch the video](https://github.com/brberis/nodinq-employee-tracker/blob/main/assets/images/video.png?raw=true)](https://drive.google.com/file/d/1ZsYnjLan6-VA56GzujnFDSzjwRGHhs0s/view)

## Features

- List All Employees (Names, Role, Department, Salary and Manager)
- Add, Delete Employee
- Update Employee's Role
- Update Employee's Manager
- List, Add and Delete Roles
- List, Add and Delete Departments
- Total and Utilized Budget by Department
- View Employees by Manager
- View Employees by Department

## Questions

Please send your questions [here](mailto:cristobal@barberis.com?subject=[GitHub]%20Nodinq%20Employee%20Tracker) or visit [github/brberis](https://github.com/brberis).

## Credits

* Cristobal A Barberis
