import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email', // 'username
      passwordField: 'password', // 'passport
    });
  }

  async validate(email: string, password: string) {
    console.log(email, password);

    const user = await this.authService.validateUser(email, password);

    if (!user)
      throw new UnauthorizedException('Usuário ou senha de login incorreto');

    return user;
  }
}
