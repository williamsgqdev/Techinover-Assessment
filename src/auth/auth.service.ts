import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;
    /**
     * Check for duplicate user
     */
    const userExist = await this.usersService.findOne(email);
    if (userExist)
      throw new BadRequestException(
        'The email address you entered already exists. Please use a different email address',
      );
    const salt = bcrypt.genSaltSync(10);
    await this.usersService.create({
      email,
      password: bcrypt.hashSync(password, salt),
      name,
    });

    return {
      message: 'Account created successfully, Kindly login',
    };
  }
}
