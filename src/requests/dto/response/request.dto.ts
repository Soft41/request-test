import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '../../enums/request-status.enum';
import { PaginatedResponse } from '../../../common/dto/pagination.dto';

export class RequestResponseDto {
  @ApiProperty({
    example: 'b2577dec-f346-47c9-bef6-ee6f0102366a',
    description: 'Request ID',
  })
  id: number;

  @ApiProperty({
    enum: RequestStatus,
    description: 'Status of the request',
  })
  status: string;

  @ApiProperty({
    example: 'Change windows',
    description: 'Text for request (description)',
  })
  text: string;

  @ApiProperty({
    example: '2025-07-29T13:00:00.000Z',
    description: 'Request creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-07-29T14:00:00.000Z',
    description: 'Request last update timestamp',
  })
  updatedAt: Date;
}

export class PaginatedRequestResponseDto extends PaginatedResponse<RequestResponseDto> {
  @ApiProperty({ type: [RequestResponseDto] })
  declare data: RequestResponseDto[];
}
