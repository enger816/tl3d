const gulp = require('gulp')
const rollup = require('rollup')
const clean = require('gulp-clean')
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const fs = require('fs');
const rollupTypescript = require('rollup-plugin-typescript2')

//清理文件
gulp.task('clean', function () {
    return gulp
        .src('dist', {
            read: false,
            allowEmpty: true
        })
        .pipe(clean('dist'))
        .pipe(clean('bin'));
});

//清理js
gulp.task('clean-js', function () {
    return gulp
        .src('dist/**/*.js', {
            read: false
        })
        .pipe(clean('*.js'));
});

//生成引擎索引文件
gulp.task("gen-tl3dindex", function (complete) {
    var importStr = "";
    var exportStr = "";
    //递归读取所有文件目录
    function readdir(dirpath) {
        var files = fs.readdirSync(dirpath);
        var ignorList = ["TL3dIndex.ts", "TestCplus.ts"];
        files.forEach((value, index, array) => {
            if (value.indexOf(".ts") == -1) //目录
            {
                readdir(dirpath + "/" + value);
            }
            else if (ignorList.indexOf(value) == -1) //这些特殊的排除一下
            {
                value = value.replace(".ts", "");
                importStr += "import { " + value + " } from '" + dirpath.replace("src", ".") + "/" + value + "';\r";
                exportStr += "export {" + value + "};\r";
            }

        }, null);
    }
    readdir("src");
    importStr += exportStr;
    fs.writeFileSync("./src/TL3dIndex.ts", importStr);
    console.log("TL3dIndex.ts 写入成功！");
    complete();
});

//编译tl3d
gulp.task("build", async function () {
    const subTask = await rollup.rollup({
        input: "src/TL3dIndex.ts",
        output: {
            file: 'dist/tl3d.js',
            format: 'iife', //iife
            extend: true,
            name: 'tl3d'
        },
        plugins: [
            rollupTypescript()
        ]
    });

    await subTask.write({
        file: 'dist/tl3d.js',
        format: 'iife', //iife
        extend: true,
        name: 'tl3d'
    });
});

//合并压缩tl3d.js
gulp.task("uglify", function () {
    return gulp.src("dist/*.js")
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify( /* options */))
        .pipe(gulp.dest("dist/"));
});

//生成tl3d.d.ts头文件
gulp.task("gendts", function (complete) {
    //递归读取所有文件目录
    var dtsstr = "declare namespace tl3d{\r";
    var readdir2 = (dirpath) => {
        var files = fs.readdirSync(dirpath);
        files.forEach((value, index, array) => {
            if (value.indexOf(".ts") == -1) //目录
            {
                readdir2(dirpath + "/" + value);
            } else {
                var filepath = dirpath + "/" + value;
                value = fs.readFileSync(filepath).toString();
                var exportIndex = value.indexOf("export");
                value = value.substring(exportIndex);
                value = value.replace(/declare /g, "");
                value = value.replace(/export {};\r\n/g, "");
                value = value.replace(/export /g, "");
                let lines = value.split("\n");
                value = "";
                for (const line of lines) {
                    value += '\t' + line + '\n';
                }
                dtsstr += value/*  + "\r" */;
            }
        }, null);
    }
    readdir2("dist/tl3d");
    readdir2("dist/tl3dinit");
    readdir2("dist/l3d");
    readdir2("dist/pansrc");
    dtsstr += "}";
    fs.writeFileSync("./bin/tl3d.d.ts", dtsstr);

    fs.copyFileSync("./dist/tl3d.js", "./bin/tl3d.js");
    fs.copyFileSync("./dist/tl3d.min.js", "./bin/tl3d.min.js");
    console.log("tl3d.d.ts 写入成功！");
    complete();
});

//gulp入口
gulp.task('default', gulp.series(
    gulp.parallel('clean'),
    gulp.parallel('clean-js'),
    gulp.parallel('gen-tl3dindex'),
    gulp.parallel('build'),
    gulp.parallel('uglify'),
    gulp.parallel('gendts'),
))