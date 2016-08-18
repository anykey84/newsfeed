"use strict";

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['./app/*.js', './app/*/*.js'], ['js']);
  gulp.watch('./sass/*.scss', ['sass']);
});


gulp.task('server', ['connect', 'watch']);

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('clean', function () {
    return gulp.src('assets/*', {read: false})
      .pipe(clean());
});

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
    .pipe(connect.reload());
});

// gulp.task('js-min', function () {
//     return gulp.src([
//         'bower_components/angular/angular.min.js'
//         , 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js'
//         , 'bower_components/angular-route/angular-route.min.js'
//         , 'bower_components/angular-sanitize/angular-sanitize.min.js'
//     ])
//       .pipe(concat('vendor.js'))
//       .pipe(gulp.dest('assets/js/'))
// });


gulp.task('js', function() {
    return gulp.src([
        'app/**'
    ])
      .pipe(concat('bundle.js'))
      //.pipe(uglify())
      .pipe(gulp.dest('assets/js/'))
      .pipe(connect.reload());
    });

// gulp.task('css', function () {
//     return gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css"
//     ])
//       .pipe(concatCss("vendor.css"))
//       .pipe(cleanCSS({ compatibility: 'ie8' }))
//       .pipe(gulp.dest('assets/css/'))
//       .pipe(connect.reload());
// });

gulp.task('fonts', function () {
    return gulp.src(["bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"
        , "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot"
        , "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg"
        , "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf"
        , "bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff"
    ])
      .pipe(gulp.dest('assets/fonts/'));
});

gulp.task('default', ['js', 'sass', 'fonts', 'connect', 'watch']);
