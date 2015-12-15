var gulp = require("gulp");
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task("browserify", function () {
    var b = browserify({
        entries: "src/scripts/page/login.js",
        debug: true
    });
    console.log(b);
    return b.bundle()
        .pipe(source("./login.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("src/prd"));
});


	// var b = browserify({
	//     entries: './script/app.js',
	//     debug: true
	// });
    //
	// return b.bundle()
    // .pipe(source('./bundle.js'))
    // .pipe(buffer())
    // .pipe(sourcemaps.write('./'))
    // .pipe(gulp.dest('./script'));
    //
    //



// 默认任务
gulp.task('default', function(){
    // gulp.run('lint', 'sass', 'scripts');
    console.log("开始构建");
    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('browserify');
    });
});
