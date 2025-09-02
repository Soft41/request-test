import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedRequestResponseDto } from './dto/response/request.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() dto: CreateRequestDto) {
    return this.requestsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, type: PaginatedRequestResponseDto })
  async findAllPaginated(@Query() paginationObject: PaginationDto) {
    return this.requestsService.findAllPaginated(paginationObject);
  }
}
