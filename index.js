const inquirer = require("inquirer");
const axios = require("axios");
const electron = require("electron");
const generateHtml = require('./generateHTML');
var fs = require('fs');
const convertFactory = require('electron-html-to');
const path = require("path");


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
            .then(function (response) {
                console.log(response.data)

                var data = response.data
                data.color = answers.colors
                data.stars = 0




                axios(`https://api.github.com/users/${answers.username}/repos`)
                    .then(function (response) {
                        // console.log(data)

                        for (var i = 0; i < response.data.length; i++) {
                            data.sum += response.data.stargazers_count
                        }



                        var finishedHtml = generateHtml(data)
                        // console.log(finishedHtml)
                        fs.writeFile("profile.html", finishedHtml, function (err) {
                            if (err)
                                console.log(err);
                        })


                            const conversion = convertFactory({
                                converterPath: convertFactory.converters.PDF
                            });

                            conversion({ html: finishedHtml }, function (err, result) {
                                if (err) {
                                    return console.error(err);
                                }

                                console.log(result.numberOfPages);
                                console.log(result.logs);
                                result.stream.pipe(fs.createWriteStream(path.join(__dirname, 'profile.pdf')));
                                conversion.kill();
                            });

                        })
                    






            })









    })
