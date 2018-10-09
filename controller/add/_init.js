const { AddNewRout } = require('./add.router');
const { AddNewModule } = require('./add.module');
const { AddNewComponent } = require('./add.component');

const fs = require("fs-extra"),
    chalk = require("chalk"),
    path = require("path")
    inquirer = require("inquirer");

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

                if (fs.existsSync(path.resolve("./app/src/ned.config.js")) && target) {

                    if (target == "route")
                        await new AddNewRout();

                    if (target == "component")
                        await new AddNewComponent();

                    if (target == "module")
                        await new AddNewModule();

                }else{
                    console.error(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.redBright("[Error]:")} Are You sure, you are in right place? we can not find "ned.config.js" file in "./app/src" folder! \n`);
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