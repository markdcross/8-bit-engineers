const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const teamArr = [];
const idArr = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const runApp = () => {
    const createManager = () => {
        console.log("Welcome! Let's build your engineering team.");
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
                teamArr.push(manager);
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
                    choices: ['Engineer', 'Intern', "I'm done!"],
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
                teamArr.push(engineer);
                idArr.push(answers.engineerId);
                buildTeam();
            });
    }

    function createIntern() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'internName',
                    message: "What is the intern's name?",
                    validate: (answer) => {
                        if (answer !== '') {
                            return true;
                        }
                        return 'Please provide a name.';
                    },
                },
                {
                    type: 'input',
                    name: 'internId',
                    message: 'What is their ID?',
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
                    name: 'internEmail',
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
                    name: 'internSchool',
                    message: 'What is their school?',
                    validate: (answer) => {
                        if (answer !== '') {
                            return true;
                        }
                        return 'Please enter a school name.';
                    },
                },
            ])
            .then((answers) => {
                const intern = new Intern(
                    answers.internName,
                    answers.internId,
                    answers.internEmail,
                    answers.internSchool
                );
                teamArr.push(intern);
                idArr.push(answers.internId);
                buildTeam();
            });
    }
    createManager();
};
runApp();
