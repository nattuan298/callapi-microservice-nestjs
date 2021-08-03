import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetOrderFilterDto {
  @IsOptional()
  @ApiPropertyOptional()
  search: string;
}
