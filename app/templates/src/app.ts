/// <reference path="../../typings/all.d.ts" />

'use strict'
<%
  _.forEach(imports, function (code, importItem) {
    %><%= code %><%
  })
%>
import island = require('island');
import store = require('island-session-store');
import keeper = require('island-keeper');
import edge = require('edge-interface');
import Promise = require('bluebird');
import url = require('url');

// Local variables
var islandKeeper = keeper.IslandKeeper.getInst();
var debug = island.debug('ISLAND:<%= APP_NAME %>:APP');

class <%= AppName %>Islet extends island.Islet {
  public main() {
<%
  _.forEach(adapters, function (code, adapter) {
    %>
    // <%= adapter %>
<%= code %><%
  })
%>
  }

  public start() {
    debug('start');
    return super.start().then((args: any[]) => {
      var host = process.env.ETCD_HOST || 'etcd';
      var port = process.env.ETCD_PORT || 4001;
      islandKeeper.init(host, port).registerIsland(process.env.SERVICE_NAME, {
        pattern: process.env.URI_PATTERN || '',
        url: url.format({
          protocol: 'http',
          hostname: process.env.HOST,
          port: process.env.PORT
        })
      });
      debug('registered');
      return args;
    });
  }
}

island.Islet.run(<%= AppName %>Islet);
