import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { RequestsRepository } from './requests.repository';
import { RedisService } from '../redis/redis.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { RequestStatus } from './enums/request-status.enum';
import { PaginationDto } from '../common/dto/pagination.dto';

describe('RequestsService', () => {
  let service: RequestsService;
  let repoMock: Partial<RequestsRepository>;
  let redisMock: Partial<RedisService>;
  let rabbitMock: Partial<RabbitMQService>;

  beforeEach(async () => {
    repoMock = {
      findAllPaginated: jest.fn().mockResolvedValue({
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
        data: [{ id: '1', text: 'test', status: RequestStatus.NEW }],
      }),
    };

    redisMock = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
    };

    rabbitMock = {
      publish: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        { provide: RequestsRepository, useValue: repoMock },
        { provide: RedisService, useValue: redisMock },
        { provide: RabbitMQService, useValue: rabbitMock },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get paginated requests and cache them', async () => {
    const pagination: PaginationDto = { page: 1, limit: 10 };
    const data = await service.findAllPaginated(pagination);

    expect(redisMock.get).toHaveBeenCalledWith('requests:page:1:limit:10');
    expect(repoMock.findAllPaginated).toHaveBeenCalledWith(pagination);
    expect(redisMock.set).toHaveBeenCalledWith(
      'requests:page:1:limit:10',
      {
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
        data: [{ id: '1', text: 'test', status: RequestStatus.NEW }],
      },
      60,
    );

    expect(data).toEqual({
      totalItems: 1,
      totalPages: 1,
      currentPage: 1,
      limit: 10,
      data: [{ id: '1', text: 'test', status: RequestStatus.NEW }],
    });
  });
});
