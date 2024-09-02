import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(100)
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity?: number;
}
