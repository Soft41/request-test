import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from './entities/request.entity';
import { RequestStatus } from './enums/request-status.enum';
import { PaginatedResponse, PaginationDto } from '../common/dto/pagination.dto';
import {
  getObjectPagination,
  toPaginatedResponse,
} from '../common/pagination.helper';

@Injectable()
export class RequestsRepository {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly repo: Repository<RequestEntity>,
  ) {}

  createRequest(text: string) {
    const request = this.repo.create({ text });
    return this.repo.save(request);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findAllPaginated(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<RequestEntity>> {
    const { skip, take } = getObjectPagination(pagination);
    const [data, totalItems] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
    return toPaginatedResponse(
      data,
      totalItems,
      pagination.page,
      pagination.limit,
    );
  }

  updateStatus(id: string, status: RequestStatus) {
    return this.repo.update(id, { status });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
