import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeDto } from '@libs/dao/base-time.dto';

export class UserDto extends BaseTimeDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nickName: string;
}
