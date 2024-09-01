import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto, SignupResponseDto } from './dto/signup.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Signup
   */
  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: SignupResponseDto,
  })
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
  /**
   * Login
   */
  login() {}
}
