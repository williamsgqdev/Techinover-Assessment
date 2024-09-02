import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  @Min(100)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;
}

export class ProductDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Boolean })
  approved: boolean;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}

export class GetProductResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: ProductDataDto })
  data: ProductDataDto;
}
export class GetProductsResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [ProductDataDto] })
  data: ProductDataDto[];
}
