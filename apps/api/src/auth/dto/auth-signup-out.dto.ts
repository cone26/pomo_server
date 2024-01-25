import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AuthLoginOutDto } from './auth-login-out.dto';

export class AuthSignupOutDto {
  // PartialType(AuthLoginOutDto)
  @ApiProperty()
  accessToken: string;

  public setAccessToken(accessToken: string): this {
    this.accessToken = accessToken;
    return this;
  }

  static of() {
    return new AuthSignupOutDto();
  }
}
