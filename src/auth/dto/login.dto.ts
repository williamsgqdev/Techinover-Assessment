import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

class UserDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: String, enum: ['user', 'admin'] })
  role: 'user' | 'admin';

  @ApiProperty({ type: Boolean })
  active: boolean;
}

class ResponseDataDto {
  @ApiProperty()
  acess_token: string;
  @ApiProperty({ type: UserDataDto })
  user: UserDataDto;
}

export class LoginResponseDto {
  @ApiProperty()
  message: string;
  @ApiProperty({ type: ResponseDataDto })
  data: ResponseDataDto;
}
