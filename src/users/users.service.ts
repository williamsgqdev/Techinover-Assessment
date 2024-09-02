import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from './entities/user.entity';
import { ITokenPayload } from 'src/auth/interfaces/token.interface';

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

  async getUsers() {
    const users = await this.usersRepository.find({
      where: {
        role: Role.user,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
    return {
      message: 'users retrieved ssuccessfully',
      data: users,
    };
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        role: Role.user,
        id,
      },
    });

    if (!user) throw new NotFoundException('user not found');

    return {
      message: 'user retrieved ssuccessfully',
      data: user,
    };
  }

  async toggleBan(id: string) {
    const { data: user } = await this.getUser(id);
    const update = await this.usersRepository.update(
      {
        id,
      },
      {
        active: !user.active,
      },
    );

    if (!update.affected)
      throw new InternalServerErrorException(
        'Oops something went wrong, Try again',
      );

    return {
      message: `user has been ${!user.active ? 'unbanned' : 'banned'} `,
      data: { ...user, active: !user.active },
    };
  }
}
