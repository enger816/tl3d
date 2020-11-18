var gulp = require('gulp');
// var clean = require('gulp-clean');
// var image = require("gulp-image");
// var assetManifest = require('gulp-asset-manifest');
// var rev = require('gulp-rev'); 
//build typescript
var rollup = require('rollup');
var rollupTypescript = require('rollup-plugin-typescript2');

//1.clean release
gulp.task('clean', function () {
    //  /*   递归所有
    //  /**  当前目录所有
    //  /*.* 所有文件
    return gulp.src(['release/*','!release/version.json'], {read: false,force:true})
        .pipe(clean());
});

//2.compiler project
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

//3.copy bin to release
gulp.task("copyFile", function () {
    var baseCopyFilter = [`./bin/**/*.*`, `!./bin/version.json`, `!./bin/common/*.*`];
    var stream = gulp.src(baseCopyFilter, {
        base: `./bin`
    });
    return stream.pipe(gulp.dest('release/'));
});

//4.compress image
gulp.task('compressimage', function () {
      return  gulp.src('./release/**/*.*')
          .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: false,
            jpegRecompress: false,
            mozjpeg: false,  //jpg
            gifsicle: false,  //gif
            svgo: true,
            concurrent: 10, //并发数
            quiet: true // defaults to false
          }))
          .pipe(gulp.dest('./release'));
      });

//5.gen version.json
gulp.task('genmanifest', function () {
   return gulp.src('release/**/*.*')
        // .pipe(sass())
        .pipe(rev()) // Optional
        .pipe(assetManifest({log:false,includeRelativePath:true,manifestFile:"release/version.json"}))
        // .pipe(gulp.dest('dist')); output manifest files
});

//gulp入口
gulp.task('default', gulp.series(
    // gulp.parallel('clean'),
    gulp.parallel('build')
    // gulp.parallel('copyFile'),
    // gulp.parallel('compressimage'),
    // gulp.parallel('genmanifest')
));