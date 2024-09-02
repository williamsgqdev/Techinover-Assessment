import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MessageOnlyResponse, SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Signup
   */
  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageOnlyResponse,
  })
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
  /**
   * Login
   */
  @Public()
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }
}
