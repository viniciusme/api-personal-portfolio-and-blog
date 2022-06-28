import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from './../user/entities/user.entity';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth routes')
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

  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return {
      message: 'Solicitação realizada com sucesso',
      user,
    };
  }

  @Auth()
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'atualização bem-sucedida',
      data,
    };
  }
}
