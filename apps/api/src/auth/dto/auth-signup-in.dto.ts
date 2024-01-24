import { ApiProperty } from '@nestjs/swagger';

export class AuthSignupInDto {
  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
