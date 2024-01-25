import { BaseTimeDto } from '@libs/dao/base-time.dto';
import { EntitySerializeImpl } from '@libs/dao/base/entity-serialize.decorator';
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@EntitySerializeImpl()
export class LetterDto extends BaseTimeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  content: string;

  @Column()
  status: number;

  @ApiProperty()
  fromUser: number;

  @ApiProperty()
  toUser: number;

  constructor(partial?: Partial<LetterDto>) {
    super();
    Object.assign(this, partial);
  }
}
