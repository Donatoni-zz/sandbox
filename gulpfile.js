/* Gulp settings
   ========================================================================== */

/* ====== Initialize ====== */

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});

/* ====== Tasks ====== */

/* Compile SASS */
gulp.task('sass', function () {
    return gulp.src('./themes/hanes/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./themes/landscape/source/assets/css'))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(browserSync.stream());
});

/* Compile & watch Hexo */
gulp.task('hexo', function () {
    hexo.init().then(function(){
      return hexo.call('generate', {watch: true});
    }).catch(function(err){
      console.log(err);
    });
});

/* Build & serve website */
gulp.task('serve', ['sass', 'hexo'], function() {

    browserSync.init({
        server: "./public",
        //startPath: "/public/sandbox/index.html"
    });


    gulp.watch("themes/landscape/scss/**/*.scss", ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});
