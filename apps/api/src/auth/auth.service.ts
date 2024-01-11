import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthLoginInDto } from './dto/auth-login-in-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_OPTIONS } from '../constants/jwt.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateJwt(payload: any) {
    return !!payload.id && !!payload.address && payload.consentPrivacyAct;
  }

  getAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: JWT_OPTIONS.expiresIn,
    });
  }

  verifyJwt(asscessToken: string) {
    return this.jwtService.verify(asscessToken, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }
}
