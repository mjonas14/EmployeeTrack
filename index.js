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

// Define empty variables to be filled
let departmentsLited = [];
let employeeList = [];
let rolesList = [];
let departments = {};
let employees = {};
let roles = {};

function generateLists() {

  // Calling it before the function so that the values are stored initially
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) console.log(err);
    else {
      departments = results;
      departmentsLited = results.map(obj => obj.department_name);
    };
  });

  db.query("SELECT * FROM employees", (err, results) => {
    if (err) console.log(err);
    else {
      employees = results;
      employeeList = results.map(obj => obj.first_name);
    };
  });

  db.query("SELECT * FROM roles", (err, results) => {
    if (err) console.log(err);
    else {
      roles = results;
      rolesList = results.map(obj => obj.title);
    }
  });
};

function getRoleId(value) {
  let roleId;
  db.query(`SELECT department_id FROM roles WHERE title = '${value}';`, (err, results) => {
    if (err) console.log(err);
    else {
      roleId = results[0].department_id;
    }
    console.log(roleId, 'This is Role ID');
    return roleId;
  });
};

function getEmployeeId (value1, value2) {
  const employeeId = db.query(`SELECT role_id FROM employees WHERE first_name = '${value1}' AND last_name = '${value2}';`);
  return employeeId;
};



function switchFunction(value) {

  switch (value) {
    case "View All Employees":
      console.table(employees);
      init();
      break;

    case "View All Roles":
      console.table(roles);
      init();
      break;

    case "View All Departments":
      console.table(departments);
      init();
      break;

    case 'Add Employee':
      addEmployee(employeeList);
      break;

      case 'Add Department':
        addDepartment();
        break;
  }
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
      switchFunction(answers.todo);

      // if (answers.todo === "Add Employee") {
      //   inquirer
      //     .prompt([
      //       {
      //         name: "employeeFirstName",
      //         message: "What is the employee's first name?",
      //         type: "input",
      //       },
      //       {
      //         name: "employeeLastName",
      //         message: "What is the employee's last name?",
      //         type: "input",
      //       },
      //       {
      //         name: "employeeRole",
      //         message: "What is the employee's role?",
      //         type: "list",
      //         choices: ["Example 1", "Example 2", "Example 3"],
      //       },
      //       {
      //         name: "employeeManager",
      //         message: "Who is the employee's manager?",
      //         type: "list",
      //         choices: ["Example 1", "Example 2", "Example 3"],
      //       },
      //     ])
      //     .then((answers) => {
      //       db.query(
      //         `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${answers.employeeFirstName}',${answers.employeeLastName},${roleDepartment});`
      //       );

      //       // Log to the console that the employee was successfully added to the database
      //       console.log(
      //         `Added ${answers.employeeFirstName} ${answers.employeeLastName} to the database`
      //       );
      //       init();
      //       // const temp2 = getDepartments();
      //       // console.log('Got departments!', temp2);
      //     });
      // }

      // else if (answers.todo === "Update Employee Role") {
      //   inquirer
      //     .prompt([
      //       {
      //         name: "employeeRoleUpdate",
      //         message: "Which employee's role do you want to update?",
      //         type: "list",
      //         choices: ["Example 1", "Example 2", "Example 3"],
      //       },
      //       {
      //         name: "employeeLastName",
      //         message:
      //           "Which role do you want to assign the selected employee?",
      //         type: "list",
      //         choices: ["Example 1", "Example 2", "Example 3"],
      //       },
      //     ])
      //     .then((answers) => {
      //       db.query(
      //         `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${answers.employeeFirstName}',${answers.employeeLastName},${roleDepartment});`
      //       );

      //       // Log to the console that the employee's role was successfully updated
      //       console.log(`Updated employee's role`);
      //       init();
      //     });
      // }

      // else if (answers.todo === "Add Role") {

      //   let departmentArray = [];
      //   const departments = getDepartments().then((answer) => {
      //     departmentArray = answer;
      //     return answer;
      //   });

      //   inquirer
      //     .prompt([
      //       {
      //         name: "roleName",
      //         message: "What is the name of the role?",
      //         type: "input",
      //       },
      //       {
      //         name: "roleSalary",
      //         message: "What is the salary of the role?",
      //         type: "input",
      //       },
      //       {
      //         name: "roleDepartment",
      //         message: "Which department does the role belong to?",
      //         type: "list",
      //         choices: departmentArray,
      //       },
      //     ])
      //     .then((answers) => {
      //       db.query(
      //         `INSERT INTO roles (title,salary,department_id) VALUES ('${answers.roleName}','${answers.roleSalary}','${answers.roleDepartment}');`
      //       );
      //       console.log("Success!");
      //       init();
      //     });
      // }

    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        message: "What is the name of the department?",
        type: "input",
      }
    ]).then((answers) => {
      db.query(
        `INSERT INTO departments (department_name) VALUES ('${answers.departmentName}');`
      );
      console.log("Successfully added a new department");
      generateLists();
      init();
    });
};

function addEmployee() {
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
        choices: rolesList,
      },
      {
        name: "employeeManager",
        message: "Who is the employee's manager?",
        type: "list",
        choices: employeeList,
      },
  ]).then(async (answers) => {
    
    console.log(answers);

    const roleId = await getRoleId(answers.employeeRole);
    console.log(roleId, 'RoleId');
    const employeeId = getEmployeeId(answers.employeeFirstName, answers.employeeLastName);
    // console.log(employeeId, 'EmployeeId');

    // db.query(`INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${answers.employeeFirstName}','${answers.employeeLastName}','${roleId}','${employeeId}');`);

    init();
  });
};

generateLists();
init();
