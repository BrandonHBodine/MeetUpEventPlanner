'use strict';
var gulp = require('gulp');

// Utilities
var browserSync = require('browser-sync').create();
var pump = require('pump');

// html
var htmlmin = require('gulp-htmlmin');

// CSS
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

// JS
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

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
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(browserSync.stream());
});

// Html
gulp.task('min-html', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});

// Compress JS
gulp.task('min-javascript', function(cb) {
  pump([
      gulp.src('app/js/*.js'),
      babel({
            presets: ['es2015']
        }),
      uglify(),
      gulp.dest('dist/js')
    ],
    cb
  );
});

// CSS
gulp.task('min-css', function() {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css'));
});

// Tasks to run
gulp.task('build', ['min-javascript', 'min-css', 'min-html']);
gulp.task('default', ['serve']);
