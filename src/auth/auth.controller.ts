import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { localAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/common/decorators';
import { User as UserEntity } from './../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  @UseGuards(localAuthGuard)
  @Post('login')
  login(@User() user: UserEntity) {
    return user;
  }

  @Get('profile')
  profile() {
    return 'Dados do usuário.';
  }
}
