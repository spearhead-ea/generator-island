    store.SessionStore.getInstance().initialize(config.redis);
    var ioAdapter = new island.SocketIOAdapter({ port: island.argv.port });
    ioAdapter.registerController(<%= AppName %>Controller);
