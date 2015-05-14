    store.SessionStore.getInstance().initialize({
      host: process.env.REDIS_HOST || 'redis',
      port: process.env.REDIS_PORT || 6379
    });
    var ioAdapter = new island.SocketIOAdapter({ port: process.env.PORT || 7777 });
    ioAdapter.registerController(<%= AppName %>Controller);
