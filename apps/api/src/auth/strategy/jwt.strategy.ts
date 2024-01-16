import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'test_token',
      //config.get<string>('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    if (this.authService.validateJwt(payload)) return payload;
    else throw new UnauthorizedException();
  }
}
