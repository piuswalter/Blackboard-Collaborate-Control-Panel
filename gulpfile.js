'use strict';

const del        = require('del');
const gulp       = require('gulp');
const htmlmin    = require('gulp-htmlmin');
const replace    = require('gulp-replace-task')
const uglify     = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const fs         = require('fs');

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify HTML files
gulp.task('html', function () {
    return gulp.src(['./source/bccp.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
        }))
        .pipe(gulp.dest('./dist'));
});

// Gulp task to minify JavaScript files
gulp.task('script', function () {
    const content = fs.readFileSync('./dist/bccp.html', 'utf8').toString();

    return gulp.src('./source/bccp.js')
        .pipe(sourcemaps.init())
        .pipe(replace({
            patterns: [{
                match: '###html###',
                replacement: content,
            }],
            usePrefix: false
        }))
        .pipe(sourcemaps.write())
        // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulp.dest('./dist'))
});
