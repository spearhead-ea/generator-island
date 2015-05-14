    var serverAdapter = new island.RestifyAdapter({
      port: process.env.PORT,
      store: store.SessionStore.getInstance().initialize({
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379
      }),
      secret: process.env.SECRET || 'edge-secret',
      middlewares: [function (req: edge.Request, res, next) {
        if (!req.session) return next(new restify.NotAuthorizedError('Session not found'));
        if (!req.session.current) return next(new restify.BadRequestError('Current racer not found'));
        next();
      }]
    });
    serverAdapter.registerController(<%= AppName %>Controller);
    this.registerAdapter('restify', serverAdapter);

