const fs = require('fs-extra'),
    chalk = require('chalk'),
    path = require("path"),
    inquirer = require('inquirer');

class AddNewRout {
    constructor() {
        this.init();
    } //@constructor

    init() {
        return new Promise((resolve, reject) => {

            var questions = [{
                type: 'input',
                name: 'routeName',
                message: "The name is:",
            }, ];

            inquirer.prompt(questions).then(answers => {

                let routeName = answers.routeName;

                let dirRout = `./app/src/pages/${routeName}`;
                let  filesDirection = `./pages/${routeName}`;

                if (!fs.existsSync(dirRout)) {

                    fs.mkdirSync(dirRout);

                    const page = `<h2>${routeName} Route Page</h2>`;
                    const script = `app.router.controller(function(){ /*console.log(this)*/ })`;
                    const style = `[${routeName}]{ /*color:red;*/ }\n\n[${routeName}] h2{font-size:30px;}`;

                    fs.writeFileSync(`${dirRout}/${routeName}.route.page.html`, page);
                    fs.writeFileSync(`${dirRout}/${routeName}.route.script.js`, script);
                    fs.writeFileSync(`${dirRout}/${routeName}.route.style.css`, style);

                    let OutPutHelp = `
                        ${chalk.bold.greenBright("[Ned Cli]:")} Don. Router "${routeName}" added successfully."
                        ${chalk.bold.greenBright("[Ned Cli][Help]:")}${chalk.yellowBright(`You can now copy and paste router config below on your application.`)}
                    
                        ${chalk.green("//Put this config in your script/js:")}

                        ${chalk.blueBright("app")}${chalk.whiteBright(".")}${chalk.blueBright("router")}${chalk.whiteBright(".")}${chalk.yellowBright("add")}(${chalk.rgb(155,85,62)(`'/${routeName}'`)},{
                            ${chalk.blueBright("name:")}  ${chalk.rgb(155,85,62)(`"${routeName} Page"`)},
                            ${chalk.blueBright("html:")}  ${chalk.rgb(155,85,62)(`"${filesDirection}/${routeName}.route.page.html"`)},
                            ${chalk.blueBright("style:")} ${chalk.rgb(155,85,62)(`"${filesDirection}/${routeName}.route.style.css"`)},
                            ${chalk.blueBright("script:")}${chalk.rgb(155,85,62)(`"${filesDirection}/${routeName}.route.script.js"`)},
                            ${chalk.yellowBright("controller")}${chalk.blueBright(":")} ${chalk.magentaBright("function")}(){ ${chalk.green(`/*console.log("/${routeName} router loaded")*/`)} }
                        });

                        ${chalk.green("//Put this tag in your static/html:(use just once in application)")}
                        ${chalk.blueBright(`<app-root></app-root>`)}
                    `;

                    console.info(OutPutHelp);

                } else {
                    console.warn(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.yellowBright("[Warning]:")} Route file already exists, try another name.\n`);
                }

            }); //inquirer

        }); //@Promis
    } //@Function: AddNewRout().init()
} //@Class: AddNewRout

module.exports = {
    AddNewRout
}