const inquirer = require("inquirer");
const generateHtml = require('./generateHTML');
var fs = require('fs');
const convertFactory = require('electron-html-to');

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