var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var footer = require('gulp-footer');
var header = require('gulp-header');
var babel = require('gulp-babel');

var config = require('./config.js');

gulp.task('default', ['build']);

gulp.task('build', ['scripts', 'sass']);

gulp.task('sass', function (done) {
  gulp.src(config.styles)
    .pipe(concat(config.style))
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(minifyCss({
      'keepSpecialComments': 0
    }))
    .pipe(rename({ 'extname': '.min.css' }))
    .pipe(gulp.dest(config.dest))
    .on('end', done);
});

gulp.task('scripts', function () {
  return gulp.src(config.js)
    .pipe(babel())
    .pipe(concat(config.script))
    .pipe(header(config.closureStart))
    .pipe(footer(config.closureEnd))
    .pipe(gulp.dest(config.dest))
    .pipe(rename({ 'extname': '.min.js' }))
    .pipe(uglify({ 'mangle': true }))
    .pipe(gulp.dest(config.dest));
});
