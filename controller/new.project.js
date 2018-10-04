const
    fs = require('fs-extra'),
    chalk = require('chalk'),
    { spawnSync } = require('child_process');


class NewProject {

    constructor(_dir, _r) {
        this.dir = _dir;
        this.realClone = _r;
        this.init();
    }

    init() {
        return new Promise(async (resolve, reject) => {

            try {
                
                //await fs.remove(this.dir)

                if (!fs.existsSync(this.dir)) {

                    //fs.copySync(path.join(__dirname, '../seedFiles'), this.dir);
                    console.info(`${chalk.bold.greenBright("\n[Ned Cli]:")} Clone starte pack:`);
                    if(this.realClone){
                        await spawnSync('git', ['clone', 'https://github.com/HosseinMarzban/ned', this.dir], {
                            stdio: 'inherit',
                            shell: true
                        });
                    }else{
                        await spawnSync('git', ['clone', 'https://github.com/HosseinMarzban/ned-seed.git', this.dir], {
                            stdio: 'inherit',
                            shell: true
                        });
                    }
                    
                    console.info(`${chalk.bold.greenBright("[Ned Cli]:")} Clone Don.`);

                    console.info(`${chalk.bold.greenBright("\n[Ned Cli]:")} Directory and files ready.`);
                    console.info(`${chalk.bold.greenBright("[Ned Cli]:")} Run NPM Install:\n`);

                    await spawnSync('npm', ["i"], {
                        stdio: 'inherit',
                        shell: true,
                        cwd: this.dir
                    });

                    console.info(`\n${chalk.bold.greenBright("[Ned Cli]:")} Don. Develop, Enjoy, Share.\n`);
                } else {
                    console.warn(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.yellowBright("[Warning]:")} Project file already exists, try another name.\n`);
                }

                resolve("done");
            } catch (error) {
                console.error(`\n${chalk.bold.greenBright("[Ned Cli]")}${chalk.bold.redBright("[Error]:")} ${error.message}\n`);
            }

        }); //@Promis
    } //@Function: init();
} //@Class: NewProject


module.exports = {
    NewProject
}