var gulp = require('gulp'), 
    sass = require('gulp-sass') ,
    browserSync = require('browser-sync').create(),
    rsync = require('rsyncwrapper').rsync;

var config = {
  themePath: './wp-content/themes/blankslate',
  sassPath: './wp-content/themes/blankslate/resources/sass',
};

gulp.task('serve', function() {
  browserSync.init({
    proxy: "http://localhost"
  });
});

gulp.task('css', function () {
  return gulp.src(config.sassPath + '/app.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(config.themePath));
});

gulp.task('rsync', function() {
  rsync({
    src: './wp-content/',
    dest: 'user@host.com:~/www/path/to/website/wp-content',
  });
});

 gulp.task('watch', function() {
  gulp.watch(config.themePath + '/**/*.php', browserSync.reload);
  gulp.watch(config.sassPath + '/**/*.scss', ['css', browserSync.reload]); 
});

  gulp.task('default', ['serve', 'watch']);
