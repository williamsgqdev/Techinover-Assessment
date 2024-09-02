import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
    const product = await this.productRepository.findOne({
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

  async updateProduct(
    user: User,
    id: string,
    updateProductDto: UpdateProductDto,
  ) {
    await this.viewProduct(user, id);

    const update = await this.productRepository.update(
      {
        id,
        user: {
          id: user.id,
        },
      },
      updateProductDto,
    );

    if (!update.affected)
      throw new BadRequestException('No record was updated');
    const { data: product } = await this.viewProduct(user, id);

    return {
      message: 'Product updated sucessfully',
      data: product,
    };
  }

  async deleteProduct(user: User, id: string) {
    await this.viewProduct(user, id);
    const op = await this.productRepository.delete({
      id,
      user: {
        id: user.id,
      },
    });

    if (!op.affected)
      throw new InternalServerErrorException(
        'Oops something went wrong, Try again',
      );

    return {
      message: 'Product deleted sucessfully',
    };
  }

  async toggleApproval(id: string) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    const update = await this.productRepository.update(
      {
        id: product.id,
      },
      {
        approved: !product.approved,
      },
    );

    if (!update.affected)
      throw new InternalServerErrorException(
        'Oops something went wrong, Try again',
      );
    return {
      message: `product has been ${!product.approved ? 'approved' : 'unapproved'} `,
      data: { ...product, approved: !product.approved },
    };
  }
}
