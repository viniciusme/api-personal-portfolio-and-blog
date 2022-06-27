import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return 'Usuário logado com sucesso!';
  }

  @Get('profile')
  profile() {
    return 'Dados do usuário.';
  }
}
