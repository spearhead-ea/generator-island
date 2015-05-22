    this.registerAdapter('broker', new island.MessageBrokerAdapter({
      uri: process.env.MONGO_HOST || 'mongodb://mongodb:27017',
      <%= app_name %>
    }));
