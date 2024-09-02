import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
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

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user && bcrypt.compareSync(password, user.password)) return user;
    return null;
  }

  async login(user: User) {
    delete user.password;
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
    };
    return {
      message: 'LoggedIn Successfully',
      data: {
        access_token: this.jwtService.sign(payload),
        user,
      },
    };
  }

  async validateUserFromToken(payload: ITokenPayload) {
    const user = await this.usersService.findOneTokenProperties(payload);
    return user;
  }
}
