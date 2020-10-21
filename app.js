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

// Everything is wrapped in the runApp function so that it will continue to repeat until escaped
const runApp = () => {
    // Define the function to output and render the generated team to the team.html file (called later)
    const outputTeam = () => {
        // Create the output directory if the output path doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamArr), 'utf-8');
    };

    // First step, create the manager of the team
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

            // Once the responses are collected, create a new Manager object
            .then((answers) => {
                const manager = new Manager(
                    answers.managerName,
                    answers.managerID,
                    answers.managerEmail,
                    answers.managerOffice
                );

                // Push the new Manager object to the team array
                teamArr.push(manager);

                // Push the ID number to an array so that we can validate that all ID numbers are unique
                idArr.push(answers.managerID);

                // Run the build team function to build the rest of the team
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
                // Create an Engineer
                if (input.addTeammate === 'Engineer') {
                    createEngineer();

                    // Create an Intern
                } else if (input.addTeammate === 'Intern') {
                    createIntern();

                    // Or, escape the function
                } else {
                    outputTeam();
                }
            });
    };

    // If engineer is selected from the buildTeam function, let's build an engineer!
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
            // Once the responses are collected, create a new Engineer object
            .then((answers) => {
                const engineer = new Engineer(
                    answers.engineerName,
                    answers.engineerId,
                    answers.engineerEmail,
                    answers.engineerGithub
                );

                // Push the new Engineer object to the team array
                teamArr.push(engineer);

                // Push the ID number to an array
                idArr.push(answers.engineerId);

                // Run the build team function again to build the rest of the team
                buildTeam();
            });
    }

    // If intern is selected from the buildTeam function, let's build an intern!
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
            // Once the responses are collected, create a new Intern object
            .then((answers) => {
                const intern = new Intern(
                    answers.internName,
                    answers.internId,
                    answers.internEmail,
                    answers.internSchool
                );
                // Push the new Intern object to the team array
                teamArr.push(intern);
                // Push the ID number to an array
                idArr.push(answers.internId);
                // Run the build team function again to build the rest of the team
                buildTeam();
            });
    }

    // Loop through again to create a new team
    createManager();
};

// Runs the whole shindig
runApp();
