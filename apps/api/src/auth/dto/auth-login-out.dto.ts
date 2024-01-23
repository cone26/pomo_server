import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginOutDto {
  @ApiProperty()
  accessToken: string;

  public setAccessToken(accessToken: string): this {
    this.accessToken = accessToken;
    return this;
  }

  static of() {
    return new AuthLoginOutDto();
  }
}
