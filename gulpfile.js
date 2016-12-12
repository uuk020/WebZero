var gulp = require('gulp');
var BrowserSync = require('browser-sync');//引入模块

gulp.task('browser-sync', function() {//注册任务
    BrowserSync({//调用API
        files: "**",//监听整个项目
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ["browser-sync"]);