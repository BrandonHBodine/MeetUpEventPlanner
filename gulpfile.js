'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync').create();

gulp.task('default', function() {
	console.log('Default task running...');
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
