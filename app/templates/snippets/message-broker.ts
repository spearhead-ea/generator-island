    this.registerAdapter('broker', new island.MessageBrokerAdapter({
      url: process.env.RABBITMQ_HOST || 'amqp://rabbitmq:5672',
      serviceName: '<%= app_name %>'
    }));
    
