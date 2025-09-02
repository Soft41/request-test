import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RequestsService } from './requests.service';
import { RequestStatus } from './enums/request-status.enum';

const workflow = [
  { status: RequestStatus.IN_PROGRESS, delay: 5000 },
  { status: RequestStatus.DONE, delay: 5000 },
];

@Injectable()
export class RequestsConsumer {
  private readonly logger = new Logger(RequestsConsumer.name);

  constructor(private readonly requestsService: RequestsService) {}

  @RabbitSubscribe({
    exchange: 'requests.exchange',
    routingKey: 'requests.new',
    queue: 'requests.new.queue',
  })
  public async handleNewRequest(msg: { id: string }) {
    this.logger.log(`Processing new request ${msg.id}`);

    for (const step of workflow) {
      await new Promise((res) => setTimeout(res, step.delay));
      await this.requestsService.updateStatus(msg.id, step.status);
    }
  }
}
