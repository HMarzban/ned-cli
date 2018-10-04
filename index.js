#!/usr/bin/env node

const program = require('commander'),
  { spawnSync } = require('child_process'),
  { NewProject } = require('./controller/new.project'),
  { AddNew }  = require('./controller/add/_init'),
  chalk = require('chalk');


program
  .version('0.6.0');


program
  .command('new <projectName')
  .action(async function (_projectName) {
    await new NewProject(_projectName);
  });


program
  .command('add')
  .action(async function () {
    try {
      new AddNew();
    } catch (error) {
      console.error(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.redBright("[Error]:")} ${error.message}\n`);
    }
  });

program
  .command('deploy <targetServe>')
  .action(async function (_targetServer) {
    console.info("[Ned Cli]: not ready.");
  });


program
  .command('serve')
  .action(async function (target) {
    await spawnSync('npm', ["start"], {
      stdio: 'inherit',
      shell: true
    });
  });


program.parse(process.argv);