import { Controller, Patch } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './entities/user.entity';

@Controller('users')
export class UsersController {
  @Roles(Role.admin)
  @Patch('/toggle-ban')
  toggleBan() {}
}
