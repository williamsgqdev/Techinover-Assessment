import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDto,
  GetProductResponseDto,
  GetProductsResponseDto,
} from './dto/create-product.dto';
import { Role, User } from 'src/users/entities/user.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { MessageOnlyResponse } from 'src/auth/dto/signup.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetProductResponseDto,
  })
  @Post('/')
  createProduct(
    @CurrentUser() user: User,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(user, createProductDto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProductsResponseDto,
  })
  @Get('/')
  viewProducts(@CurrentUser() user: User) {
    return this.productService.viewProducts(user);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProductResponseDto,
  })
  @Get(':id')
  viewProduct(@CurrentUser() user: User, @Param('id') id: string) {
    return this.productService.viewProduct(user, id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProductResponseDto,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(user, id, updateProductDto);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageOnlyResponse,
  })
  @Delete(':id')
  deleteProduct(@CurrentUser() user: User, @Param('id') id: string) {
    return this.productService.deleteProduct(user, id);
  }

  @Roles(Role.admin)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProductResponseDto,
  })
  @Patch('/toggle-approval/:id')
  toggleApproval(@Param('id') id: string) {
    return this.productService.toggleApproval(id);
  }
}
