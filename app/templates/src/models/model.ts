/// <reference path="../../../typings/all.d.ts" />
import Promise = require('bluebird');
import island = require('island');

class <%= AppName %> {
  constructor() {
    var service = island.Islet.getIslet();
  }

  public get<%= AppName %>() {
    return Promise.resolve();
  }

  public update<%= AppName %>() {
    return Promise.resolve();
  }

  public create<%= AppName %>() {
    return Promise.resolve();
  }

  public delete<%= AppName %>() {
    return Promise.resolve();
  }
}

export = <%= AppName %>;