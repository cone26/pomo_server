import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginInDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
