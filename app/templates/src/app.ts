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
  public main(config: any) {
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
      islandKeeper.registerIsland(island.argv.serviceName, {
        pattern: '',
        url: url.format({
          protocol: 'http',
          hostname: island.argv.host,
          port: island.argv.port.toString()
        })
      });
      debug('registered');
      return args;
    });
  }
}

debug('entrypoint');
var serverConfig = islandKeeper.init(island.argv.etcdServer.host, island.argv.etcdServer.port).getIslandConfig();
island.Islet.run(serverConfig, <%= AppName %>Islet);
