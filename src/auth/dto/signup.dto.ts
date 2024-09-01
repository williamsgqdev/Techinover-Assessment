import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword(
    {},
    {
      message:
        'Password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, and one special character.',
    },
  )
  password: string;
}

export class SignupResponseDto {
  @ApiProperty()
  message: string;
}
