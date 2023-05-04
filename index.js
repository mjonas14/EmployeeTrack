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
  console.log(`Connected to database: ${dbName}`)
);

async function getDepartments() {
  try {
    const departmentList = await new Promise((resolve, reject) => {
      db.query("SELECT department_name FROM departments", (err, results) => {
        if (err) console.log(err);
        else {
          const flatList = results.flatMap(Object.values);
          resolve(flatList);
        }
      });
    });
    console.log(departmentList.length);
    return departmentList;
  } catch (err) {
    console.error(err);
  }
}


function getDepartments2() {
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) console.log(err)
    else {
      console.table(results);
      init();
    };
  });
};

function getEmployees() {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) console.log(err)
    else {
      console.table(results);
      init();
    };
  });
};

function getRoles() {
  db.query("SELECT * FROM roles", (err, results) => {
    if (err) console.log(err)
    else {
      console.table(results);
      init();
    };
  });
};



function init() {
  inquirer
    .prompt([
      {
        name: "todo",
        message: "What would you like to do?",
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
      if (answers.todo === "View All Employees") getEmployees();
      
      else if (answers.todo === "Add Employee") {
        inquirer
          .prompt([
            {
              name: "employeeFirstName",
              message: "What is the employee's first name?",
              type: "input",
            },
            {
              name: "employeeLastName",
              message: "What is the employee's last name?",
              type: "input",
            },
            {
              name: "employeeRole",
              message: "What is the employee's role?",
              type: "list",
              choices: ["Example 1", "Example 2", "Example 3"],
            },
            {
              name: "employeeManager",
              message: "Who is the employee's manager?",
              type: "list",
              choices: ["Example 1", "Example 2", "Example 3"],
            },
          ])
          .then((answers) => {
            db.query(
              `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${answers.employeeFirstName}',${answers.employeeLastName},${roleDepartment});`
            );

            // Log to the console that the employee was successfully added to the database
            console.log(
              `Added ${answers.employeeFirstName} ${answers.employeeLastName} to the database`
            );
            init();
            // const temp2 = getDepartments();
            // console.log('Got departments!', temp2);
          });
      } 
      
      else if (answers.todo === "Update Employee Role") {
        inquirer
          .prompt([
            {
              name: "employeeRoleUpdate",
              message: "Which employee's role do you want to update?",
              type: "list",
              choices: ["Example 1", "Example 2", "Example 3"],
            },
            {
              name: "employeeLastName",
              message:
                "Which role do you want to assign the selected employee?",
              type: "list",
              choices: ["Example 1", "Example 2", "Example 3"],
            },
          ])
          .then((answers) => {
            db.query(
              `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${answers.employeeFirstName}',${answers.employeeLastName},${roleDepartment});`
            );

            // Log to the console that the employee's role was successfully updated
            console.log(`Updated employee's role`);
            init();
          });
      } 
      
      else if (answers.todo === "View All Roles") getRoles();
      
      else if (answers.todo === "Add Role") {

        let departmentArray = [];
        const departments = getDepartments().then((answer) => {
          departmentArray = answer;
          return answer;
        });

        inquirer
          .prompt([
            {
              name: "roleName",
              message: "What is the name of the role?",
              type: "input",
            },
            {
              name: "roleSalary",
              message: "What is the salary of the role?",
              type: "input",
            },
            {
              name: "roleDepartment",
              message: "Which department does the role belong to?",
              type: "list",
              choices: departmentArray,
            },
          ])
          .then((answers) => {
            db.query(
              `INSERT INTO roles (title,salary,department_id) VALUES ('${answers.roleName}','${answers.roleSalary}','${answers.roleDepartment}');`
            );
            console.log("Success!");
            init();
          });
      } 
      
      else if (answers.todo === "View All Departments") getDepartments2();
      
      else if (answers.todo === "Add Department") {
        inquirer
          .prompt([
            {
              name: "departmentName",
              message: "What is the name of the department?",
              type: "input",
            },
          ])
          .then((answers) => {
            db.query(
              `INSERT INTO departments (department_name) VALUES ('${answers.departmentName}');`
            );
            console.log("Successfully added a new department");
            init();
          });
      }
    });
}

init();
