import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestStatus } from './enums/request-status.enum';
import { PaginatedResponse, PaginationDto } from '../common/dto/pagination.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { RedisService } from '../redis/redis.service';
import { RequestEntity } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    private readonly requestsRepo: RequestsRepository,
    private readonly rabbitService: RabbitMQService,
    private readonly redisService: RedisService,
  ) {}

  async create(createDto: CreateRequestDto) {
    const request = await this.requestsRepo.createRequest(createDto.text);

    await this.rabbitService.publish('requests.exchange', 'requests.new', {
      id: request.id,
    });

    return request;
  }

  async findAllPaginated(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<RequestEntity>> {
    const cacheKey = `requests:page:${pagination.page}:limit:${pagination.limit}`;

    const cached =
      await this.redisService.get<PaginatedResponse<RequestEntity>>(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await this.requestsRepo.findAllPaginated(pagination);

    await this.redisService.set(cacheKey, data, 60);

    return data;
  }

  async updateStatus(id: string, status: RequestStatus) {
    await this.requestsRepo.updateStatus(id, status);
  }
}
