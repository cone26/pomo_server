import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@libs/dao/common/user/user.dto';

export class SendLetterInDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  to: number[]; // friend user id
}
