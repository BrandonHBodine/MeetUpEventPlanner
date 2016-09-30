'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./app"
  });

  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

// Compress JS
gulp.task('compress', function() {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Tasks to run
gulp.task('build', ['compress']);
gulp.task('default', ['serve']);
