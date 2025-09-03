import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({
    example: 'Repair window',
    description: 'Text for request',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
