
const fs = require('fs-extra'),
    chalk = require('chalk'),
    inquirer = require('inquirer'),
    { spawnSync } = require('child_process');
    path = require("path");

class NodeJsDeploy{
    constructor(){
        this.init();
    }//@Constructor

    init(){

        return new Promise( async (resolve, reject)=>{

            console.log("ready nojed deployment");
            console.log("Note: this feature is not ready yet fully!");

            fs.removeSync('./dist');
            fs.mkdirSync('./dist');
            fs.copySync('./app/src', './dist/app');

            const NodeJsServe = `

                    (() => {

                        const express = require('express'),
                            ip = require('ip'),
                            app = express(),
                            path = require('path'),
                            chalk = require('chalk'),
                            PORT = process.env.PORT || 600;
                    
                    
                        app.use('/', express.static(path.join(__dirname, 'app')))
                    
                    
                        // handle every other route with index.html, which will contain
                        // a script tag to your application's JavaScript file(s).
                        app.all('*', function (request, response) {
                            response.sendFile(path.resolve(__dirname, './app/index.html'));
                        });
                    
                    
                        app.listen(PORT, () => {
                            console.log("Server Ready to serve on port"+PORT);
                        });
                    
                    })();
            
            `

            fs.copySync('./package.json','./dist/package.json');
            fs.writeFileSync(`./dist/app.js`, NodeJsServe);
            fs.copySync('./nodemon.json','./dist/nodemon.json');
            fs.copySync('./LICENSE','./dist/LICENSE');

        });//@Promis

    }//@Function: NodeJsDeploy().init()

}//@Class: NodeJsDeploy

module.exports = {
    NodeJsDeploy
}