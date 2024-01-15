import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeDto } from '@libs/dao/base-time.dto';

export class UserDto extends BaseTimeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  gameDbId: number;
}
