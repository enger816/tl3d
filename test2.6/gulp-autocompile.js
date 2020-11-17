var gulp = require("gulp");
var exec = require("child_process");
function compile(cb) {
    //执行编译命令 layaair2-cmd compile 
    var process = exec.exec("gulp");
    process.stdout.on("data",(data)=>{
        console.log(data);
    });
    process.stderr.on("data",(data)=>{
        console.log(data);
    });
    process.on("exit",(code,signal)=>{
        console.log("success");
        console.log(code,signal);
        cb();
    })
}
//创建一个名称为compile的gulp任务
gulp.task("compile", function(){
    /**
     * @ 监听src目录下的所有子目录的所有文件，
     * @ 延迟1000毫秒，才执行下次监听，避免手欠的同学，因连续保存触发多次连续编译
     * @ 监听生效后执行的函数
     */
    gulp.watch('src/**/*.*', {delay:1000}, compile);
});

//gulp入口
gulp.task('default', gulp.series(
    // gulp.parallel('clean'),
    // gulp.parallel('clean-js')
    gulp.parallel('compile')
));