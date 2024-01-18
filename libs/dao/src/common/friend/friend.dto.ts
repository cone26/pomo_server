import { ApiProperty } from '@nestjs/swagger';
import { EntitySerializeImpl } from '@libs/dao/base/entity-serialize.decorator';
import { BaseTimeDto } from '@libs/dao/base-time.dto';

@EntitySerializeImpl()
export class FriendDto extends BaseTimeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  friendId: number;

  @ApiProperty()
  process: number;

  constructor(partial?: Partial<FriendDto>) {
    super();
    Object.assign(this, partial);
  }
}
