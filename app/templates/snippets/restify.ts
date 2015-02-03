    this.registerAdapter('restify', new island.RestifyAdapter({
      port: 8080,
      store: sessionStore,
      secret: 'edge-secret',
      middlewares: [function (req: common.Request, res, next) {
        if (!req.session) return next(new restify.NotAuthorizedError('Session not found'));
        if (!req.session.current) return next(new restify.BadRequestError('Current racer not found'));
        next();
      }]
    }));
