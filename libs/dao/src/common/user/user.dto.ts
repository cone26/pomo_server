import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeDto } from '@libs/dao/base-time.dto';
import { EntitySerializeImpl } from '@libs/dao/base/entity-serialize.decorator';

@EntitySerializeImpl()
export class UserDto extends BaseTimeDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nickName: string;

  constructor(partial?: Partial<UserDto>) {
    super();
    Object.assign(this, partial);
  }
}
