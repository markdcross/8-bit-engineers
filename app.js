const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const employeeArr = [];
const idArr = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const createManager = () => {
    console.log("Welcome! Let's build your team.");
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'managerName',
                message: "What is the manager's name?",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    }
                    return 'Please provide a name.';
                },
            },
            {
                type: 'input',
                name: 'managerID',
                message: 'What is their ID number?',
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                    return 'Please provide a valid ID number.';
                },
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'What is their email address?',
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return 'Please enter a valid email address.';
                },
            },
            {
                type: 'input',
                name: 'managerOffice',
                message: 'What is their office number?',
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                    return 'Please provide a valid office number.';
                },
            },
        ])
        .then((answers) => {
            const manager = new Manager(
                answers.managerName,
                answers.managerID,
                answers.managerEmail,
                answers.managerOffice
            );
            employeeArr.push(manager);
            idArr.push(answers.managerID);
            buildTeam();
        });
};

const buildTeam = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'addTeammate',
                message: 'Who would you like to add to the team?',
                choices: [
                    'Engineer',
                    'Intern',
                    "I don't want to add any more team members",
                ],
            },
        ])
        .then((input) => {
            if (input.addTeammate === 'Engineer') {
                createEngineer();
            } else if (input.addTeammate === 'Intern') {
                createIntern();
            } else {
                outputTeam();
            }
        });
};

function createEngineer() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: "What is the engineer's name?",
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    }
                    return 'Please provide a name.';
                },
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'What is their ID number?',
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        if (idArr.includes(answer)) {
                            return 'This ID is already in use.';
                        } else {
                            return true;
                        }
                    }
                    return 'Please provide a valid ID number.';
                },
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'What is their email?',
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return 'Please enter a valid email address.';
                },
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'What is their GitHub username?',
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    }
                    return 'Please enter a GitHub username';
                },
            },
        ])
        .then((answers) => {
            const engineer = new Engineer(
                answers.engineerName,
                answers.engineerId,
                answers.engineerEmail,
                answers.engineerGithub
            );
            employeeArr.push(engineer);
            idArr.push(answers.engineerId);
            buildTeam();
        });
}

createManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
