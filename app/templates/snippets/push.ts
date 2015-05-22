    this.registerAdapter('push', new island.PushAdapter({
      url: process.env.RABBITMQ_HOST || 'amqp://rabbitmq:5672'
    }));