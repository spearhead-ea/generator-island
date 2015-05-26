/// <reference path="../../../typings/all.d.ts" />
import restify = require('restify');
import island = require('island');
import Promise = require('bluebird');

import <%= AppName %> = require('../models/<%= app_name %>-model');

class <%= AppName %>Controller extends island.AbstractController<restify.Server> {
  private <%= appName %>: <%= AppName %>;

  public initialize() {
    this.server.get('/<%= app_name %>', this.get<%= AppName %>.bind(this));
    this.server.put('/<%= app_name %>', this.update<%= AppName %>.bind(this));
    this.server.post('/<%= app_name %>', this.create<%= AppName %>.bind(this));
    this.server.del('/<%= app_name %>', this.delete<%= AppName %>.bind(this));

    this.<%= appName %> = island.ModelFactory.get<<%= AppName %>>(<%= AppName %>);
    return Promise.resolve();
  }

  protected get<%= AppName %>(req, res, next) {
  	this.<%= appName %>.get<%= AppName %>().then(() => {
      res.json({});
    });
  }

  protected update<%= AppName %>(req, res, next) {
    this.<%= appName %>.update<%= AppName %>().then(() => {
      res.json({});
    });
  }

  protected create<%= AppName %>(req, res, next) {
    this.<%= appName %>.create<%= AppName %>().then(() => {
      res.json({});
    });
  }

  protected delete<%= AppName %>(req, res, next) {
    this.<%= appName %>.delete<%= AppName %>().then(() => {
      res.json({});
    });
  }
}

export = <%= AppName %>Controller;
