import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  productId: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
