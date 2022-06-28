import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { User } from 'src/common/decorators';
import { User as UserEntity } from './../user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      message: 'Login realizado com sucesso',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return 'Dados do usuário.';
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'atualização bem-sucedida',
      data,
    };
  }
}
