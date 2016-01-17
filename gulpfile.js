'use strict';

let gulp    = require('gulp');
let sass    = require('gulp-sass');
let run     = require('gulp-run');
let seq     = require('run-sequence');
let nodemon = require('gulp-nodemon');

gulp.task('css', () => {
  return gulp.src('./app/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css/'));
});

gulp.task('electron', () => {
  nodemon({
    script: './electron.js'
  })
});

gulp.task('run', (cb) => {
  return seq('css', 'electron', cb);
});

gulp.task('default', ['run'], () => {
  gulp.watch('./app/scss/**/*.scss', ['css']);
});
