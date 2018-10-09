const fs = require('fs-extra'),
    chalk = require('chalk'),
    path = require("path");

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const minify = require("gulp-babel-minify");



class ApacheDeploy {
    constructor() {
        this.init();
    } //@Constructor

    init() {

        return new Promise(async (resolve, reject) => {

            console.log("ready nojed deployment");
            console.log("Note: this feature is not ready yet fully!");

            fs.removeSync('./dist');
            fs.mkdirSync('./dist');
            fs.copySync('./app/src', './dist');

            const apacheConfig = `
                RewriteEngine On
                # set the base URL prefix
                RewriteBase /
                # for requests for index.html, just respond with the file
                RewriteRule ^index\.html$ - [L]
                # if requested path is not a valid filename, continue rewrite
                RewriteCond %{REQUEST_FILENAME} !-f
                # if requested path is not a valid directory, continue rewrite
                RewriteCond %{REQUEST_FILENAME} !-d
                # if you have continue to here, respond with index.html
                RewriteRule . /index.html [L]
            `

            fs.writeFileSync(`./dist/.htaccess`, apacheConfig);


            // gulp.src("./dist/**/**/*.js")
            //     .pipe(minify({
            //        // removeConsole: true,
            //     }))
            //     .pipe(gulp.dest(function (file) {
            //         let path = file.base;
            //         return path.replace('src', 'dist');
            //     }));


            gulp.src("./dist/**/**/*.html")
                .pipe(htmlmin({
                    collapseWhitespace: true,
                    removeComments:true,
                }))
                .pipe(gulp.dest(function (file) {
                    let path = file.base
                    // console.log(path)
                    return path.replace('src', 'dist');
                }));

            gulp.src("./dist/**/**/*.css")
                .pipe(cleanCSS({
                    compatibility: 'ie8'
                }))
                .pipe(gulp.dest(function (file) {
                    let path = file.base
                    // console.log(path)
                    return path.replace('src', 'dist');
                }));





            console.log("gulp finish");
            console.log("All Done. ");


            resolve("done");

        }); //@Promis

    } //@Function: ApacheDeploy().init()

} //@Class: ApacheDeploy

module.exports = {
    ApacheDeploy
}