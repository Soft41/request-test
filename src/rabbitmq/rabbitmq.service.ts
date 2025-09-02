import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish(exchange: string, routingKey: string, payload: any) {
    return this.amqpConnection.publish(exchange, routingKey, payload);
  }
}
