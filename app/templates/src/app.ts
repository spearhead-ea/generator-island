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
var debug = island.debug('<%= app_name %>');

class <%= AppName %>Islet extends island.Islet {
  public main() {
  	debug('main() method called');
<%
  _.forEach(adapters, function (code, adapter) {
    %>
    // <%= adapter %>
<%= code %><%
  })
%>
  }

  public start() {
    debug('start() method called');
    return super.start().then((args: any[]) => {
      islandKeeper.registerIsland(process.env.SERVICE_NAME, {
        pattern: '',
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

debug('entrypoint');
islandKeeper.init(process.env.ETCD_HOST || 'etcd', process.env.ETCD_PORT || 4001);
island.Islet.run(<%= AppName %>Islet);
