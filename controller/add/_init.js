const { AddNewRout } = require('./add.router');
const { AddNewModule } = require('./add.module');
const { AddNewComponent } = require('./add.component');

const fs = require('fs-extra'),
    chalk = require('chalk'),
    inquirer = require('inquirer'),
    { spawnSync } = require('child_process');
    path = require("path");

class AddNew {
    constructor() {
        this.init()
    } //@constructor

    init() {


        var questions = [{
            type: 'list',
            name: 'target',
            message: "You Wanna Add New:",
            choices: ["route", "component", "module"]
        }];

        inquirer.prompt(questions).then(async answers => {
            let target = answers.target;

            try {

                if (fs.existsSync("./ned.settings.json") && target) {

                    if (target == "route")
                        await new AddNewRout();

                    if (target == "component")
                        await new AddNewComponent();

                    if (target == "module")
                        await new AddNewModule();

                }
            } catch (error) {
                console.error(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.redBright("[Error]:")} ${error.message}\n`);
            }
        }); //inquirer

    } //@Function: AddNew().init()
} //@Class: AddNew()


module.exports = {
    AddNew
};