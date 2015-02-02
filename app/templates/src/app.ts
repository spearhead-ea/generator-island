/// <reference path="../typings/tsd.d.ts" />

'use strict'
<%
  _.forEach(imports, function (code, importItem) {
    %><%= code %><%
  })
%>
import vertex = require('vertex');
import store = require('vertex-session-store');
import common = require('edge-common');

class MyVertex extends vertex.Vertex {
  public main(options: vertex.ServiceOptions) {

<%
  _.forEach(adapters, function (code, adapter) {
    %>
    // <%= adapter %>
<%= code %><%
  })
%>
  }
}

vertex.Vertex.run(MyVertex);
