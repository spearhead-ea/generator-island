    var serverAdapter = new island.RestifyAdapter({
      port: island.argv.port,
      store: store.SessionStore.getInstance().initialize(config.redis),
      secret: config.secret,
      middlewares: [function (req: edge.Request, res, next) {
        if (!req.session) return next(new restify.NotAuthorizedError('Session not found'));
        if (!req.session.current) return next(new restify.BadRequestError('Current racer not found'));
        next();
      }]
    });
    serverAdapter.registerController(<%= AppName %>Controller);
    this.registerAdapter('restify', serverAdapter);

