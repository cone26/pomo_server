import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@libs/dao/common/user/user.dto';
import { EntitySerializeImpl } from '@libs/dao/base/entity-serialize.decorator';
import { ExcludeBaseTimeDto } from '@libs/dao/exclude-base-time.dto';

@EntitySerializeImpl()
export class FriendOutDto extends ExcludeBaseTimeDto {
  @ApiProperty()
  friend: UserDto;

  constructor(partial?: Partial<FriendOutDto>) {
    super();
    Object.assign(this, partial);
  }
}
