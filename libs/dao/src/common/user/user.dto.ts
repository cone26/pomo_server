import { BaseTimeDto } from '@app/dao/base-time.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends BaseTimeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  gameDbId: number;
}
