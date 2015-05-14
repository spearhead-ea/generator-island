    this.registerAdapter('mongoose', new island.MongooseAdapter({
      uri: process.env.MONGO_HOST || 'mongodb://mongodb:27017'
    }));
