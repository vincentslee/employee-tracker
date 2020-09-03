DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
	id INT,
	department_name VARCHAR(30),
	PRIMARY KEY(id)
);

CREATE TABLE employee_role(
	id INT,
	title VARCHAR(30),
	salary DECIMAL,
	department_id INT,
	PRIMARY KEY(id)
);
CREATE TABLE employee(
	id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INt,
    PRIMARY KEY(id)
);

INSERT INTO department (id, department_name)
VALUES (1, "development")
