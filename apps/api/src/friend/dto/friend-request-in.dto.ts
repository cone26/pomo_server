import { ApiProperty } from '@nestjs/swagger';

export class FriendRequestInDto {
  @ApiProperty()
  targetNickname: string;
}
