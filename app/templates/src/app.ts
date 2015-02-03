/// <reference path="../typings/tsd.d.ts" />

'use strict'
<%
  _.forEach(imports, function (code, importItem) {
    %><%= code %><%
  })
%>
import island = require('island');
import store = require('island-session-store');
import common = require('edge-common');

class MyIslet extends island.Islet {
  public main(options: island.ServiceOptions) {

<%
  _.forEach(adapters, function (code, adapter) {
    %>
    // <%= adapter %>
<%= code %><%
  })
%>
  }
}

island.Islet.run(MyIslet);
