const gulp = require('gulp')
const rollup = require('rollup')
const clean = require('gulp-clean')
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const fs = require('fs');

const rollupTypescript = require('rollup-plugin-typescript2')

gulp.task('clean', function () {
    return gulp
        .src('dist', {
            read: false,
            allowEmpty: true
        })
        .pipe(clean('dist'));
});



gulp.task('clean-js', function () {
    return gulp
        .src('dist/**/*.js', {
            read: false
        })
        .pipe(clean('*.js'));
});


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

gulp.task("uglify", function () {
    return gulp.src("dist/*.js")
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify( /* options */ ))
        .pipe(gulp.dest("dist/"));
}); 

gulp.task("gendts", function (complete) {
    //递归读取所有文件目录
    var dtsstr="declare  module tl3d{  \r";
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
                value = value.replace(/declare/g, "");
                dtsstr += value + "\r";
            }
        }, null);
    }
    readdir2("dist/tl3d");
    readdir2("dist/tl3dinit");
    readdir2("dist/pansrc");
    dtsstr += "}";
    fs.writeFileSync("./dist/tl3d.d.ts", dtsstr);
    console.log("tl3d.d.ts 写入成功！");
    complete();
});

gulp.task('default', gulp.series(
    gulp.parallel('clean'),
    gulp.parallel('clean-js'),
    gulp.parallel('build'),
    gulp.parallel('uglify'),
    gulp.parallel('gendts'),
))