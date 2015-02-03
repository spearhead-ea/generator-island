'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stylish ' + chalk.red('Island') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'app_name',
      message: 'xxxx-island에서 xxxx 자리에 들어갈 이름이 뭔가요?'
    }, {
      type: 'list',
      name: 'type',
      message: '어떤 유형의 버텍스를 만들 작정이죠?',
      'default': 'restify',
      choices: ['restify', 'amqp', 'both']
    }, {
      type: 'checkbox',
      name: 'adapters',
      message: '어떤 어댑터를 기본 설치할까요?',
      'default': ['redis'],
      choices: ['redis', 'session-store']
    }];

    this.prompt(prompts, function (answers) {
      this.context = { app_name: answers.app_name + '-island'};
      var deps = this.context.dependencies = [];
      var adapters = this.context.adapters = answers.adapters;

      switch (answers.type) {
      case 'restify':
        deps.push('restify');
        adapters.push('restify');
        break;
      case 'amqp':
        break;
      case 'both':
        deps.push('restify');
        adapters.push('restify');
        break;
      }

      this.mkdir(this.context.app_name);
      this.destinationRoot(this.context.app_name);
      done();
    }.bind(this));
  },

  // _.merge.apply(_, [{}].concat(_.map(adapters, function (adapter) {
  //   var name = self.sourceRoot() + '/snippets/import.' + adapter + '.ts';
  //   if (fs.existsSync(name)) {
  //     var obj = {};
  //     obj[adapter] = fs.readFileSync(name).toString();
  //     return obj;
  //   }
  // })))
  writing: {
    app: function () {
      var self = this;
      function exists(a) { return !!a; }
      function nameAndCodeString(filePrefix) {
        return _.merge.apply(_, [{}].concat(_.map(self.context.adapters, function (adapter) {
          var name = self.sourceRoot() + filePrefix + adapter + '.ts'
          if (fs.existsSync(name)) {
            var obj = {};
            obj[adapter] = fs.readFileSync(name).toString();
            return obj;
          }
        })));
      }
      function templateAdapters() {
        var adapters = self.context.adapters;
        return {
          imports: nameAndCodeString('/snippets/import.'),
          adapters: nameAndCodeString('/snippets/')
        };
      }
      this.template('_package.json', 'package.json', this.context);
      this.mkdir('./src');
      this.template('src/app.ts', 'src/app.ts', templateAdapters());
    },

    projectfiles: function () {
      this.template('editorconfig', '.editorconfig');
      this.template('jshintrc', '.jshintrc');
      this.template('gulpfile.js', 'gulpfile.js');
      this.template('tsd.json', 'tsd.json');
      this.directory(
        this.templatePath('./bin'),
        this.destinationPath('bin')
      )
    }
  },

  install: function () {
    var deps = ['bluebird', 'lodash'];
    deps.push.apply(deps, this.context.dependencies);
    // npm install
    this.npmInstall(deps.concat(['../externals/island', '../externals/island-session-store']), {'save': true});
    this.npmInstall(['gulp', 'gulp-typescript', 'gulp-sourcemaps', 'event-stream'], {'saveDev': true});
    // tsd install
    var tsdDeps = deps;
    var command = ['install', ['edge-common', 'island', 'island-session-store'].concat(deps), '-ros'];
    this.spawnCommand('tsd', _.flatten(command));
  }
});
