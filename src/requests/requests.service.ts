import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestStatus } from './enums/request-status.enum';
import { PaginationDto } from '../common/dto/pagination.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class RequestsService {
  constructor(
    private readonly requestsRepo: RequestsRepository,
    private readonly rabbitService: RabbitMQService,
  ) {}

  async create(createDto: CreateRequestDto) {
    const request = await this.requestsRepo.createRequest(createDto.text);

    await this.rabbitService.publish('requests.exchange', 'requests.new', {
      id: request.id,
    });

    return request;
  }

  async findAllPaginated(paginatedObject: PaginationDto) {
    return this.requestsRepo.findAllPaginated(paginatedObject);
  }

  async updateStatus(id: string, status: RequestStatus) {
    await this.requestsRepo.updateStatus(id, status);
  }
}
