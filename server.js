const inquirer = require("inquirer");
//const fs = require("fs");
//const util = require("util");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "employee_db",
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
    Init();
});

//Main menu
function Init(){
    inquirer.prompt({
        type: "list",
        name: "todo",
        message: "What would you like to do?",
        choices: [
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "Done",
        ]
    }).then(function(response){
        //console.log(response);

        //Takes response string and evaluates it to execute relevant function
        let str = response.todo.replace(/\s/g, '')+"()";
        eval(str);
    });
}
function Done(){};

//add department
function Adddepartment(){
    console.log("Executed Adddepartment");
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "Enter department name: "
    }]).then(function(response){
        connection.query(
            "INSERT INTO DEPARTMENT SET ?",
            {
                department_name: response.department,
            },
            function(err, res){
                if (err) throw err;
                console.log("Added department" + res);
                Departments();
            }
        );
    });

}

//Add role
function Addrole(){
    console.log("Executed Addrole");
    inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "Enter role title: "
    },
    {
        type: "input",
        name: "salary",
        message: "Enter role salary: "
    },
    {
        type: "input",
        name: "department_id",
        message: "Enter department id: "
    }
    ]).then(function(response){
        connection.query(
            "INSERT INTO EMPLOYEE_ROLE SET ?",
            {
                title: response.title,
                salary: response.salary,
                department_id: response.department_id
            },
            function(err, res){
                if (err) throw err;
                console.log("Added info: " + res);
                EmployeeRoles();
            }
        );
    });

}

//Add employee
function Addemployee(){
    console.log("Executed Addemployee");
    inquirer.prompt([
    {
        type: "input",
        name: "first_name",
        message: "Enter first name: "
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter last name: "
    },
    {
        type: "input",
        name: "role_id",
        message: "Enter role id: "
    }
    ]).then(function(response){
        connection.query(
            "INSERT INTO EMPLOYEE SET ?",
            {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: response.role_id
            },
            function(err, res){
                if (err) throw err;
                console.log("Added info: " + res);
                Employees();
            }
        );
    });

}

function Departments(){
    connection.query("SELECT * FROM DEPARTMENT", function(err, res) {
      if (err) throw err;
      console.table(res);
      Init();
    });
  }

function EmployeeRoles(){
    connection.query("SELECT * FROM EMPLOYEE_ROLE", function(err, res) {
    if (err) throw err;
    console.table(res);
    Init();
});
}

function Employees(){
    connection.query("SELECT * FROM EMPLOYEE", function(err, res) {
    if (err) throw err;
    console.table(res);
    Init();
});
}


//Update employee roles
function Updateemployeerole() {
    inquirer.prompt([  
    {
        type: "input",
        name: "employee", 
        message: "Enter employee id: "
    },
    {
        type: "input",
        name: "role", 
        message: "Enter new role by id: "
    }    
    ])
        .then(function(response) {
        connection.query(
            "UPDATE EMPLOYEE SET ROLE_ID = ? where ID = ?",
            [response.role, response.employee],  
        function(err) {
            if (err) throw err;
            Employees();
            });
        })
    }
