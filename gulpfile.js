var gulp = require("gulp");
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var fs = require("fs");
var result;
var pathScript = "./src/prd/scripts";
var pathStyles = "./src/prd/styles";
var path = "./src/files.txt";
var config = {
    scripts:[
        "./src/scripts/page/login.js",//源文件路径
        "./src/scripts/page/index.js"
    ],
    styles:[
        "./src/styles/login.css",
        "./src/styles/common.css"
    ]
};
gulp.task("file",function (){
    fs.writeFile(path,"");
    fs.readdir(pathScript, function(err, files){

        files.forEach(function(files){
            fs.writeFile(path,"./prd/scripts/"+files+"\n",{ 'flag': 'a' });
        });


    });
    fs.readdir(pathStyles, function(err, files){

        files.forEach(function(files){
            fs.writeFile(path,"./prd/styles/"+files+"\n",{ 'flag': 'a' });
        });


    });

});
gulp.task("clear",function (){

     var folder_scripts = fs.existsSync(pathScript);
     var folder_styles = fs.existsSync(pathStyles);
     if(folder_scripts == true){
        var dirList = fs.readdirSync(pathScript);

         dirList.forEach(function(fileName){
            fs.unlinkSync(pathScript+"/" + fileName);
         });
     }
     if(folder_styles==true){
         var dirList = fs.readdirSync(pathStyles);

          dirList.forEach(function(fileName)
          {
             fs.unlinkSync(pathStyles+"/" + fileName);
          });
     }

})
gulp.task("browserify", function () {

    for(var i=0;i<config.scripts.length;i++){
        var item = config.scripts[i];//取到当前文件路径
        var name = config.scripts[i].split("/").pop();//取到当前文件的名称,生成的文件名称与之一样
        var b = browserify({
            entries: item,
            debug: true
        });
           b.bundle()
            .pipe(source(name))
            .pipe(buffer())
            .pipe(rev())
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(pathScript));

    }
    gulp.src('src/styles/*.css')
        .pipe(rev())
        .pipe(gulp.dest(pathStyles));
        
    setTimeout(function(){
        gulp.run("file");
    },5000);

});

// 默认任务
gulp.task('default', function(){
    gulp.run(['clear','browserify']);
});
