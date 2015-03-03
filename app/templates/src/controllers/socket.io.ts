/// <reference path="../../../typings/all.d.ts" />
import island = require('island');
import io = require('socket.io');

class <%= AppName %>Controller extends island.AbstractController<SocketIO.Server> {
  protected initialize() {
    this.server.on('connect', this.onConnected.bind(this));
  }

  protected onConnected(socket: SocketIO.Socket) {

  }
}

export = <%= AppName %>Controller;