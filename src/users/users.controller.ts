import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './entities/user.entity';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserResponseDto, GetUsersResponseDto } from './dto/users.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.admin)
  @Get('/')
  @ApiResponse({
    type: GetUsersResponseDto,
    status: HttpStatus.OK,
  })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Roles(Role.admin)
  @Get(':id')
  @ApiResponse({
    type: GetUserResponseDto,
    status: HttpStatus.OK,
  })
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Roles(Role.admin)
  @Patch('/toggle-ban/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: GetUserResponseDto,
    status: HttpStatus.OK,
  })
  toggleBan(@Param('id') id: string) {
    return this.usersService.toggleBan(id);
  }
}
