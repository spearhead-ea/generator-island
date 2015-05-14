    this.registerAdapter('redis', new island.RedisConnectionAdapter({
      host: process.env.REDIS_HOST || 'redis',
      port: process.env.REDIS_PORT || 6379
    }));
