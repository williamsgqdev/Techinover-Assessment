import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiBearerAuth()
  @Post('/')
  createProduct(
    @CurrentUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(user, createProductDto);
  }
}
