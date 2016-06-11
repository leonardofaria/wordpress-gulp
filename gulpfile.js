var gulp = require('gulp'), 
    sass = require('gulp-sass') ,
    uglify = require('gulp-uglifyjs'),
    browserSync = require('browser-sync').create(),
    rsync = require('rsyncwrapper').rsync;

var config = {
  themePath: './wp-content/themes/blankslate',
  sassPath: './wp-content/themes/blankslate/resources/sass',
  jsPath: './wp-content/themes/blankslate/resources/js',
  dest: './wp-content/themes/blankslate'
};

gulp.task('serve', function() {
  browserSync.init({
    proxy: "http://localhost"
  });
});

gulp.task('js', function() {
  return gulp.src(config.jsPath + '/app.js')
    .pipe(uglify())
    .pipe(gulp.dest(config.dest));
});

gulp.task('css', function () {
  return gulp.src(config.sassPath + '/app.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(config.dest));
});

gulp.task('rsync', function() {
  rsync({
    src: './wp-content/',
    dest: 'user@host.com:~/www/path/to/website/wp-content',
  });
});

 gulp.task('watch', function() {
  gulp.watch(config.themePath + '/**/*.php').on('change', browserSync.reload);
  gulp.watch(config.sassPath + '/**/*.scss', ['css', browserSync.reload]); 
  gulp.watch(config.jsPath + '/**/*.js', ['js', browserSync.reload]); 
});

  gulp.task('default', ['serve', 'watch']);
