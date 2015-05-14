'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var tsc = require('gulp-tsc');
var del = require('del');

var sources = ['./src/**/*.ts'];
function compileTypescript() {
  gulp.src(sources)
    .pipe(tsc({
      target: 'ES5',
      module: 'commonjs',
      sourcemap: true,
      declaration: true,
      outDir: './dist',
      emitError: false
    }))
    .pipe(gulp.dest('dist/'));
}

function watch() {
  gulp.watch(sources, ['build']);
}

function clean(done) {
  del(['./dist/'], done);
}

function start() {
  nodemon({
    verbose: true,
    execMap: {
      js: 'node'
    },
    script: 'dist/app.js',
    watch:['./dist'],
    ext: 'js json'
  });
}

gulp.task('clean', clean);
gulp.task('build', compileTypescript);
gulp.task('watch', watch);
gulp.task('start', start);
gulp.task('debug', ['watch'], start);
