'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var tsc = require('gulp-tsc');
var del = require('del');
var inspector = require('gulp-node-inspector');

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

function staticdata() {
  gulp.src(['./src/staticdata/*.json'])
      .pipe(gulp.dest('dist/staticdata/', {mode: '0644'}))
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
      js: 'node --debug'
    },
    script: 'dist/app.js',
    watch:['./dist'],
    ext: 'js json'
  });
}

function debug() {
  gulp.src([])
    .pipe(inspector({
       debugPort: 5858,
       webHost: '0.0.0.0',
       webPort: process.env.DEBUG_PORT || 8888
    }));
}

gulp.task('clean', clean);
gulp.task('build', ['staticdata'], compileTypescript);
gulp.task('staticdata', staticdata);
gulp.task('watch', watch);
gulp.task('start', start);
gulp.task('debug', ['watch', 'start'], debug);