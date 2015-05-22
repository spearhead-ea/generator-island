    this.registerAdapter('rpc', new island.RPCAdapter({
      url: process.env.RABBITMQ_HOST || 'amqp://rabbitmq:5672'
    }));