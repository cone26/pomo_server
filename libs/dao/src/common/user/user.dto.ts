import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeDto } from '@libs/dao/base-time.dto';
import { EntitySerializeImpl } from '@libs/dao/base/entity-serialize.decorator';

@EntitySerializeImpl()
export class UserDto extends BaseTimeDto {
  @ApiProperty()
  id: number;

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

  constructor(partial?: Partial<UserDto>) {
    super();
    Object.assign(this, partial);
  }
}
