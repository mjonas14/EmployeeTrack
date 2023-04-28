require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");

const dbName = process.env.DB_NAME;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
  },
  console.log(`Connected to database: ${process.env.DB_NAME}`)
);

const questions = ["What would you like to do?"];

function init() {
  inquirer
    .prompt([
      {
        name: "todo",
        message: questions[0],
        type: "list",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((answers) => {
      if (answers.todo === "View All Employees") {
        db.query("SELECT * FROM employee", (err, results) => console.log(results));
      } else if (answers.todo === "View All Employees") {
        db.query("SELECT * FROM employee", (err, results) => console.log(results));
      } else if (answers.todo === "View All Employees") {
        db.query("SELECT * FROM employee", (err, results) => console.log(results));
      } else if (answers.todo === "View All Employees") {
        db.query("SELECT * FROM employee", (err, results) => console.log(results));
      } else if (answers.todo === "View All Employees") {
        db.query("SELECT * FROM employee", (err, results) => console.log(results));
      }
    });
}

init();
