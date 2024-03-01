import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginInDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  socialProvider: string;

  @ApiProperty()
  externalId: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
