import { ApiProperty } from '@nestjs/swagger';
import { UserDataDto } from 'src/auth/dto/login.dto';

export class GetUsersResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [UserDataDto] })
  data: UserDataDto[];
}
export class GetUserResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [UserDataDto] })
  data: UserDataDto[];
}
