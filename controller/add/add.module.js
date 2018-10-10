const fs = require('fs-extra'),
    chalk = require('chalk'),
    inquirer = require('inquirer');


class AddNewModule {
    constructor() {
        this.init();
    } //@constructor

    init() {

        var questions = [{
            type: 'list',
            name: 'target',
            message: "Module For:",
            choices: ["router", "component"]
        }];

        inquirer.prompt(questions).then(async answers => {
            let targetModule = answers.target;

            try {
                let data = await this.creatModuleFor(targetModule)

                if (!fs.existsSync(`./app/src/${targetModule}/${data.for}/modules/${data.moduleName}`)) {


                    if (targetModule == "component")
                        targetModule = "components";

                    if (targetModule == "router")
                        targetModule = "pages";

                    if (!fs.existsSync(`./app/src/${targetModule}/${data.for}/modules`))
                        fs.mkdirSync(`./app/src/${targetModule}/${data.for}/modules`);


                    if (!fs.existsSync(`./app/src/${targetModule}/${data.for}/modules/${data.moduleName}`))
                        fs.mkdirSync(`./app/src/${targetModule}/${data.for}/modules/${data.moduleName}`);
                    else
                        throw new Error(`Module file already exists, try another name.`)

                    const page = `<h2>${data.moduleName} Module content</h2>`;
                    const script = `app.module.controller(function(){ /*console.log(this)*/ })`;
                    const style = `[${data.moduleName}]{ /*color:red;*/ }\n\n[${data.moduleName}] h2{font-size:30px;}`;

                    fs.writeFileSync(`./app/src/${targetModule}/${data.for}/modules/${data.moduleName}/${data.moduleName}.module.page.html`, page);
                    fs.writeFileSync(`./app/src/${targetModule}/${data.for}/modules/${data.moduleName}/${data.moduleName}.module.script.js`, script);
                    fs.writeFileSync(`./app/src/${targetModule}/${data.for}/modules/${data.moduleName}/${data.moduleName}.module.style.css`, style);

                    let OutPutHelp = `
                        ${chalk.bold.greenBright("[Ned Cli]:")} Don. Module "${data.moduleName}" added successfully."
                        ${chalk.bold.greenBright("[Ned Cli][Help]:")}${chalk.yellowBright(`You can now copy and paste module config below on your route/componet.controller() application.`)}
                    
                        ${chalk.green("//Put this config in your script/js controller:")}
                        ${chalk.blueBright("app")}${chalk.whiteBright(".")}${chalk.blueBright("router")}${chalk.whiteBright(".")}${chalk.yellowBright("controller")}(${chalk.magentaBright("function")}(){
                            ${chalk.green(`/*.......Rest of Your Code......*/`)}
                            ${chalk.blueBright("this")}${chalk.whiteBright(".")}${chalk.blueBright("module")}${chalk.whiteBright(".")}${chalk.yellowBright("add")}({
                                ${chalk.blueBright("tag:")}   ${chalk.rgb(155,85,62)(`"module-${data.moduleName}"`)},
                                ${chalk.blueBright("html:")}  ${chalk.rgb(155,85,62)(`"./${targetModule}/${data.for}/modules/${data.moduleName}/${data.moduleName}.module.page.html"`)},
                                ${chalk.blueBright("style:")} ${chalk.rgb(155,85,62)(`"./${targetModule}/${data.for}/modules/${data.moduleName}/${data.moduleName}.module.style.css"`)},
                                ${chalk.blueBright("script:")}${chalk.rgb(155,85,62)(`"./${targetModule}/${data.for}/modules/${data.moduleName}/${data.moduleName}.module.script.js"`)},
                            });

                            ${chalk.green(`/*.......Don not forget, after module configuration initial module.......*/`)}
                            
                            ${chalk.blueBright("this")}${chalk.whiteBright(".")}${chalk.blueBright("module")}${chalk.whiteBright(".")}${chalk.yellowBright("init")}();

                            ${chalk.green(`/*.......Rest of Your Code......*/`)}
                        });

                        ${chalk.green("//Put this tag in your static/html:")}
                        ${chalk.blueBright(`<module-${data.moduleName}></module-${data.moduleName}>`)}
                    `;

                console.info(OutPutHelp);
                } else {
                    console.warn(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.yellowBright("[Warning]:")} Module file already exists, try another name.\n`);
                }
            } catch (error) {
                console.error(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.redBright("[Error]:")} ${error.message}\n`);
            }
        }); //inquirer

    } //@Function: AddNewModule().init()

    creatModuleFor(_target) {

        return new Promise((resolve, reject) => {

           let targetList;

            if(_target == "router")
                targetList =  fs.readdirSync("./app/src/pages");
            else
                targetList =  fs.readdirSync("./app/src/components");
    
            var questions = [{
                type: 'list',
                name: 'for',
                message: "For:",
                choices: targetList
            }, {
                type: 'input',
                name: 'moduleName',
                message: "And The name is:",
            }];

            inquirer.prompt(questions).then(answers => {
                resolve(answers)
            })

        }); //@Promis

    } //@Function: AddNewModule().creatModuleFor(_target)

} //@Class: AddNewModule()


module.exports = {
    AddNewModule
}