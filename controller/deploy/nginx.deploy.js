

const fs = require('fs-extra'),
    chalk = require('chalk'),
    inquirer = require('inquirer'),
    { spawnSync } = require('child_process');
    path = require("path");

class NginxDeploy{
    constructor(){
        this.init();
    }//@Constructor

    init(){

        return new Promise( async (resolve, reject)=>{

            console.log("ready nojed deployment");
            console.log("Note: this feature is not ready yet fully!");

            fs.removeSync('./dist');
            fs.mkdirSync('./dist');
            fs.copySync('./app/src', './dist');

            const apacheConfig = `
                    #pid        logs/nginx.pid;
                    events {
                        worker_connections  1024;
                    }
                    http {
                        include       mime.types;
                        default_type  application/octet-stream;
                        sendfile        on;
                        keepalive_timeout  65;
                        gzip  on;
                        server {
                            listen       80;
                            server_name  localhost;
                            index index.html;
                            location / {
                                try_files $uri $uri/ /index.html;
                            }
                            error_page   500 502 503 504  /50x.html;
                            location = /50x.html {
                                root   html;
                            }
                        }
                    }
            `
            fs.writeFileSync(`./dist/nginx.conf`, apacheConfig);
            console.log("dont forget to set nginx.conf")
            console.log("all files must be in first depth of your root")
            resolve("done");

        });//@Promis
        

    }//@Function: NginxDeploy().init()

}//@Class: NginxDeploy

module.exports = {
    NginxDeploy
}