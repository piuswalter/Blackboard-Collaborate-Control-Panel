'use strict';

var del        = require('del');
var gulp       = require('gulp');
var htmlmin    = require('gulp-htmlmin');
var replace    = require('gulp-replace-task')
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var fs         = require('fs');

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify HTML files
const htmlFile = gulp.task('html', function () {
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

