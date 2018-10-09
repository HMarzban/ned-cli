const fs = require('fs-extra'),
    chalk = require('chalk'),
    inquirer = require('inquirer'),
    { spawnSync } = require('child_process');
    path = require("path");

const {NodeJsDeploy} = require('./nodejs.deploy');
const {NginxDeploy}  = require('./nginx.deploy');
const {ApacheDeploy} = require('./apache.deploy');

class DeployApp{
    constructor(){
        this.init();
    }//@constructor

    init(){

        var questions = [{
            type: 'list',
            name: 'target',
            message: "What's your Deployment Target?",
            choices: ["NodeJs", "Nginx", "Apache"]
        }];

        inquirer.prompt(questions).then(async answers => {
            console.log(answers.target)

            let target = answers.target

            if(target === "NodeJs")
                await new NodeJsDeploy();

            if(target === "Nginx")
                await new NginxDeploy();

            if(target === "Apache")
                await new ApacheDeploy();

        })

    }//@Function: DeployApp().init()
}//@Function: DeployApp()

module.exports = {
    DeployApp
 }