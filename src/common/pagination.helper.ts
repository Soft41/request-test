import { PaginatedResponse, PaginationDto } from './dto/pagination.dto';

export function getObjectPagination(pagination: PaginationDto) {
  return {
    skip: (pagination.page - 1) * pagination.limit,
    take: pagination.limit,
  };
}

export function toPaginatedResponse<T>(
  data: T[],
  totalItems: number,
  page: number,
  limit: number,
): PaginatedResponse<T> {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    totalPages,
    currentPage: page,
    limit,
    data,
  };
}
