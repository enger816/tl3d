let gulp = require("gulp");
let fs = require("fs-extra");
let path = require("path");
const exec = require("child_process").exec;
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const tsCfg = fs.readJSONSync(path.join(__dirname, "tsconfig.json"))
const outFile = tsCfg['compilerOptions']['outFile'];
const outDic = path.dirname(outFile);
const destDic = path.join(__dirname, outDic);

function replaceGod() {
    let text = String(fs.readFileSync(outFile));
    text = text.replace('var tl3d;', "window.tl3d={};");
    text = text.replace(/var tl3d;/g, "");
    text = text.replace('var __extends', "window.__extends");
    text = text.replace('var __spreadArrays', "window.__spreadArrays");
    text = text.replace('var __generator', "window.__generator");
    text = text.replace('var $schedulerKey', "window.$schedulerKey");
    text = '//tl3dLib\n' + text;
    fs.writeFileSync(outFile, text);
    console.log('outFile:' + outFile);
}

//压缩合并
gulp.task("uglify", function () {
    return gulp.src("bin/tl3d.js")
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify( /* options */ ))
        .pipe(gulp.dest("bin/"));
});

//编译
gulp.task("build", function (done) {
    // fs.removeSync(destDic)
    fs.ensureDirSync(destDic);
    tsc = exec('tsc');
    tsc.stdout.on('data', function (data) {
        console.log(data);
    });

    tsc.on('exit', (code) => {
        replaceGod();
        done();
    });
});

//入口
gulp.task('default', gulp.series(
    gulp.parallel('build'),
    gulp.parallel('uglify')
))