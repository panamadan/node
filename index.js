const inquirer = require("inquirer");
const axios = require("axios");
const electron = require("electron");
const generateHtml = require('./generateHTML');
var fs = require('fs');
const convertFactory = require('electron-html-to');



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


        axios(`https://api.github.com/users/${answers.username}`)
            .then(function (data) {
                console.log(data)
                data.color = answers.colors


                axios(`https://api.github.com/users/${answers.username}/repos`)
                    .then(function (data) {
                        console.log(data)
                    })

                var finishedHtml = generateHtml(data)
                console.log(finishedHtml)
                var conversion = convertFactory({
                    converterPath: convertFactory.converters.PDF
                });

                conversion({ html: finishedHtml }, function (err, result) {
                    if (err) {
                        return console.error(err);
                    }

                    console.log(result.numberOfPages);
                    console.log(result.logs);
                    result.stream.pipe(fs.createWriteStream('profile.pdf'));
                    conversion.kill();
                });






            })









    })
