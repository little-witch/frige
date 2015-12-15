var gulp = require("gulp");
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task("browserify", function () {
    var b = browserify({
        entries: "./src/scripts/page/login.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("logins.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("../../prd"));
});

// 默认任务
gulp.task('default', function(){
    // gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('browserify');
    });
});
