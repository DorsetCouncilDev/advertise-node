var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var    exec = require('child_process').exec;



gulp.task('sass', function(done) {
    gulp.src('public/scss/*.scss')
    .pipe(sass({style: 'expanded'}))
      .on('error', gutil.log)
    .pipe(gulp.dest('public/css'))
    done();
  });
  gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('server', function (cb) {
    exec('node main.js', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});

gulp.task('start', function (done) {
    nodemon({
      script: 'main.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
    , done: done
    })
  })

    gulp.task('watch',gulp.series(['sass','browserSync']),function(){
        gulp.watch('public/scss/**/*.scss',['sass']);
        gulp.watch('pages/*.html',browserSync.reload);
        gulp.exec("server");
 

});
