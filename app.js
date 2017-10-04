var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');
var fs = require('fs');

var basicCardCreator = function () {
    inquirer.prompt([{
        name: 'front',
        message: 'What should the front of the card say?(no commas please)'
    }, {
        name: 'back',
        message: 'What should the back say?(no commas please)'
    }]).then(function (answer) {
        BasicCard.cardCreator(answer.front, answer.back);
        app();
    })

}

var clozeCardCreator = function () {
    inquirer.prompt([{
        name: 'text',
        message: 'What should the text say?(no commas please)'
    }, {
        name: 'cloze',
        message: 'What is the cloze?(no commas please)'
    }]).then(function (answer) {
        ClozeCard.cardCreator(answer.text, answer.cloze);
        app();
    })

}

var createCard = function () {
    inquirer.prompt({
        name: 'cardType',
        message: 'Would you like to create a regular flash card or a Cloze-Deleted Card?(r/cd)'
    }).then(function (answer) {
        var choice = answer.cardType.toLowerCase();
        if (choice === 'r') {
            basicCardCreator();
        } else if (choice === 'cd') {
            clozeCardCreator();
        } else {
            console.log('Command not recognized. Please enter a valid command.');
            createCard();
        }
    })
}

var practice = function (i) {
    fs.readFile("flashCards.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.split(",");

        if (data[i]) {
            if (data[i] === 'basicCard') {
                inquirer.prompt({
                    name: 'answer',
                    message: data[++i]
                }).then(function (response) {
                    if (response.answer.toLowerCase() === data[++i].toLowerCase()) {
                        console.log('Correct!');
                    } else {
                        console.log('That was incorrect. The correct answer was:');
                        console.log(data[i])
                    }
                    practice(++i);
                })
            } else if (data[i] === 'clozeCard') {
                inquirer.prompt({
                    name: 'answer',
                    message: data[++i]
                }).then(function (response) {
                    if (response.answer.toLowerCase() === data[++i].toLowerCase()) {
                        console.log('Correnct!');
                        console.log(data[++i]);
                    } else {
                        console.log('That was incorrect. The correct answer was:');
                        console.log(data[++i]);
                    }
                    practice(++i);
                })
            }
        }

        if (!data[i]) {
            app();
        }

    });

}

var app = function () {
    inquirer.prompt({
        name: 'mode',
        message: 'Would you like to create a flash card or practice?(c/p)(type "exit" to stop program)'
    }).then(function (answer) {
        var choice = answer.mode.toLowerCase();
        if (choice === 'c') {
            createCard();
        } else if (choice === 'p') {
            practice(0);
        } else if (choice === 'exit') {
            //stops program
        } else {
            console.log('Command not recognized. Please enter a valid command.');
            start();
        }
    })
}

app();