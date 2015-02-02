    var sessionStore = store.SessionStore.getInstance();
    sessionStore.initialize({ port: 6379, host: 'redis' });
