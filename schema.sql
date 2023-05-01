DROP DATABASE IF EXISTS employee_list;
CREATE DATABASE employee_list;

USE employee_list;

-- Department table
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

-- Role table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- Employee table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
    );

