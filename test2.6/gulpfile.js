var gulp = require('gulp');
var rollup = require('rollup');
var clean = require('gulp-clean');
var rollupTypescript = require('rollup-plugin-typescript2');

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

//编译tl3d
gulp.task("build", async function () {
    var subTask = await rollup.rollup({
        input: "src/Main.ts",
        output: {
            file: 'bin/js/bundle.js',
            format: 'iife', //iife
            extend: true,
            name: 'bundle'
        },
        plugins: [
            rollupTypescript()
        ]
    });

    await subTask.write({
        file: 'bin/js/bundle.js',
        format: 'iife', //iife
        extend: true,
        name: 'bundle'
    });
});


//gulp入口
gulp.task('default', gulp.series(
    // gulp.parallel('clean'),
    // gulp.parallel('clean-js')
    gulp.parallel('build')
));