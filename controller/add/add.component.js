const fs = require('fs-extra'),
    chalk = require('chalk'),
    inquirer = require('inquirer');

class AddNewComponent {
    constructor() {
        this.init();
    } //@constructor

    init() {
        return new Promise((resolve, reject) => {

            var questions = [{
                type: 'input',
                name: 'componentName',
                message: "The name is:",
            }, ];

            inquirer.prompt(questions).then(answers => {
                let componentName = answers.componentName;

                let dirRout = `./app/src/components/${componentName}`;
                let  filesDirection = `./components/${componentName}`;

                if (!fs.existsSync(dirRout)) {


                    fs.mkdirSync(dirRout);

                    const page = `<h2>${componentName} Components content</h2>`;
                    const script = `app.component.controller(function(){ /*console.log(this)*/ })`;
                    const style = `[${componentName}]{ /*color:red;*/ }\n\n[${componentName}] h2{font-size:30px;}`;

                    fs.writeFileSync(`${dirRout}/${componentName}.component.page.html`, page);
                    fs.writeFileSync(`${dirRout}/${componentName}.component.script.js`, script);
                    fs.writeFileSync(`${dirRout}/${componentName}.component.style.css`, style);

                    let OutPutHelp = `
                        ${chalk.bold.greenBright("[Ned Cli]:")} Don. Component "${componentName}" added successfully."
                        ${chalk.bold.greenBright("[Ned Cli][Help]:")}${chalk.yellowBright(`You can now copy and paste component config below on your application.`)}
                    
                        ${chalk.green("//Put this config in your script/js:")}
                        ${chalk.blueBright("app")}${chalk.whiteBright(".")}${chalk.blueBright("component")}${chalk.whiteBright(".")}${chalk.yellowBright("add")}(${chalk.rgb(155,85,62)(`'component-${componentName}'`)},{
                            ${chalk.blueBright("html:")}  ${chalk.rgb(155,85,62)(`"${filesDirection}/${componentName}.component.page.html"`)},
                            ${chalk.blueBright("style:")} ${chalk.rgb(155,85,62)(`"${filesDirection}/${componentName}.component.style.css"`)},
                            ${chalk.blueBright("script:")}${chalk.rgb(155,85,62)(`"${filesDirection}/${componentName}.component.script.js"`)},
                            ${chalk.yellowBright("controller")}${chalk.blueBright(":")} ${chalk.magentaBright("function()")}{ ${chalk.green(`/*console.log("<component-${componentName}></component-${componentName}> component loaded")*/`)} }
                        });

                        ${chalk.green("//Put this tag in your static/html:")}
                        ${chalk.blueBright(`<component-${componentName}></component-${componentName}>`)}
                    `;

                    console.info(OutPutHelp)



                } else {
                    console.warn(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.yellowBright("[Warning]:")} Component file already exists, try another name.\n`);
                }
            }); //inquirer
        }); //@Promis
    } //@Function : AddNewComponent().init()

}; //@Class: AddNewComponent()


module.exports = {
    AddNewComponent
}