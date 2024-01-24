import { PartialType } from '@nestjs/swagger';
import { AuthLoginOutDto } from './auth-login-out.dto';

export class AuthSignupOutDto extends PartialType(AuthLoginOutDto) {
  static of() {
    return new AuthSignupOutDto();
  }
}
