import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(user: User, createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create({
      ...createProductDto,
      user,
    });
    const product = await this.productRepository.save(newProduct);
    delete product.user;
    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  async viewProducts(user: User) {
    const products = await this.productRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return {
      message: 'Products fetched successfully',
      data: products,
    };
  }

  async viewProduct(user: User, id: string) {
    const product = await this.productRepository.find({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }
}
