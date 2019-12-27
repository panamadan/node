const inquirer = require("inquirer");
const axios = require("axios");
const electron = require("electron");
const generateHtml = require('./generateHTML');

inquirer.prompt([
    {
        type: "input",
        message: "Enter your Git Hub Username:",
        name: "username"

    },
    {
        type: "list",
        message: "What is your Favorite color..?",
        choices: ["red", "blue", "green", "pink"],
        name: "colors"


    }])
    .then(function (answers) {
        console.log(answers);


        axios('https://api.github.com/users/${answers.username}')
        .then(function(data){
            console.log(data)

        })

        
        }
generateHtml()




    


    })
