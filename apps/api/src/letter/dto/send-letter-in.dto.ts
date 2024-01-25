import { ApiProperty } from '@nestjs/swagger';

export class SendLetterInDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  toUser: number[]; // friend user id
}
