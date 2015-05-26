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
      message: '어떤 유형의 island를 만들 작정이죠?',
      'default': 'restify',
      choices: ['restify', 'socket.io']
    }, {
      type: 'checkbox',
      name: 'adapters',
      message: '어떤 어댑터를 기본 설치할까요?',
      'default': [],
      choices: ['redis', 'mongoose', 'push', 'rpc', 'message-broker']
    }];

    this.prompt(prompts, function (answers) {
      this.context = { app_name: answers.app_name, dir_name: answers.app_name + '-island'};
      var deps = this.context.dependencies = [];
      var adapters = this.context.adapters = answers.adapters;

      switch (answers.type) {
      case 'restify':
        deps.push('restify');
        adapters.push('restify');
        break;
      case 'socket.io':
        deps.push('socket.io');
        adapters.push('socket.io');
        break;
      }
      this.context.type = answers.type;
      this.context.appName = _.camelCase(this.context.app_name);
      this.context.AppName = _.capitalize(this.context.appName);

      this.mkdir(this.context.dir_name);
      this.destinationRoot(this.context.dir_name);
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
            obj[adapter] = _.template(fs.readFileSync(name).toString())(self.context);
            return obj;
          }
        })));
      }
      function templateAdapters() {
        var adapters = self.context.adapters;
        return _.merge({}, self.context, {
          imports: nameAndCodeString('/snippets/import.'),
          adapters: nameAndCodeString('/snippets/')
        });
      }
      this.template('_package.json', 'package.json', this.context);
      this.mkdir('./src');
      this.template('src/app.ts', 'src/app.ts', templateAdapters());
      this.mkdir('./src/controllers');
      this.template('src/controllers/' + self.context.type + '.ts', 'src/controllers/' + self.context.app_name + '-controller.ts', this.context);
      if (self.context.type === 'restify') {
        this.mkdir('./src/models');
        this.template('src/models/model.ts', 'src/models/' + self.context.app_name + '-model.ts', this.context);
      }
    },

    projectfiles: function () {
      this.template('editorconfig', '.editorconfig');
      this.template('jshintrc', '.jshintrc');
      this.template('gulpfile.js', 'gulpfile.js');
      this.directory(
        this.templatePath('./scripts'),
        this.destinationPath('scripts')
      )
    }
  },

  install: function () {
    var deps = ['bluebird', 'lodash'].concat(this.context.dependencies, this.context.adapters);
    _.pull(deps, 'push', 'rpc', 'message-broker');
    // npm install
    this.npmInstall(deps.concat(['../externals/island', '../externals/island-session-store', '../externals/island-keeper']), {'saveOptional': true});
    this.npmInstall(['del', 'gulp', 'gulp-node-inspector', 'gulp-nodemon', 'gulp-tsc', 'jasmine', 'supertest'], {'saveDev': true});
    // tsd install
    //this.destinationRoot(this.context.dir_name + '/../');
    //var command = ['update', '-ros'];
    //this.spawnCommand('tsd', _.flatten(command));
    //this.destinationRoot(this.context.dir_name);
  }
});
