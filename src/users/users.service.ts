import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ITokenPayload } from 'src/interfaces/token-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(payload: Partial<User>) {
    const newUser = this.usersRepository.create(payload);
    const user = await this.usersRepository.save(newUser);
    return user;
  }

  async findOne(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findOneTokenProperties(payload: ITokenPayload) {
    const user = await this.usersRepository.findOne({
      where: {
        email: payload.email,
        id: payload.sub,
      },
    });

    return user;
  }
}
