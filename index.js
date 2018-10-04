#!/usr/bin/env node

const program = require('commander'),
  { spawnSync } = require('child_process'),
  { NewProject } = require('./controller/new.project'),
  { AddNew }  = require('./controller/add/_init'),
  chalk = require('chalk');


program
  .version('0.6.2', '-v, --version')
  .description('Gives you Current version of Ned-cli')


program
  .command('new <projectName> ')
  .option('-r, --realWork', 'Clone Simple but usefull Real Ned Application')
  .description('Creat new "Ned" project')
  .action(async function (_projectName,_realWork) {
    await new NewProject(_projectName, _realWork.realWork);
  });


program
  .command('add')
  .description('Add new "Router", "Component" and "Module" in current Project')
  .action(async function () {
    try {
      new AddNew();
    } catch (error) {
      console.error(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.redBright("[Error]:")} ${error.message}\n`);
    }
  });

program
  .command('deploy <targetServe>')
  .description('Deploy your application for these three target: "Nginx", "Apache " and "Node"')
  .action(async function (_targetServer) {
    console.info("[Ned Cli]: not ready.");
  });


program
  .command('serve')
  .description('Run npm start, to serve your application')
  .action(async function (target) {
    await spawnSync('npm', ["start"], {
      stdio: 'inherit',
      shell: true
    });
  });


program.parse(process.argv);