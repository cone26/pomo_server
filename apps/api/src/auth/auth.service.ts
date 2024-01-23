import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_OPTIONS } from '../constants/jwt.constants';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateJwt(payload: any) {
    return !!payload.sub && !!payload.email;
  }

  getAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: JWT_OPTIONS.expiresIn,
    });
  }

  verifyJwt(accessToken: string) {
    return this.jwtService.verify(accessToken, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }
}
