DROP DATABASE IF EXISTS employee_list;
CREATE DATABASE employee_list;

USE employee_list;

-- Department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30)
);

-- Role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(2,2) NOT NULL,
    department_id INT NOT NULL
);

-- Employee table
CREATE TABLE employee (
    id INT NOT NULL, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT NOT NULL
    );

