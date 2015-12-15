var gulp = require("gulp");
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');

gulp.task("browserify", function () {
    var b = browserify({
        entries: "./src/scripts/page/login.js",
        debug: true
    });
    return b.bundle()
        .pipe(source("login.js"))
        .pipe(buffer())
        // .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', gutil.log)
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./src/prd"));
});

// 默认任务
gulp.task('default', function(){
    // 监听文件变化
    // gulp.watch('.//*.js', function(){
        gulp.run('browserify');
    // });
});
