import { Controller, Get } from '@nestjs/common';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { CurrentUser } from '@libs/common/decorator/current-user.decorator';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { FriendOutDto } from '../friend/dto/friend-out.dto';
import { LetterDto } from '@libs/dao/common/letter/letter.dto';
import { LetterService } from './letter.service';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}
  @Get('/unread/list')
  @ApiResponseEntity({ summary: '확인하지 않은 편지 리스트' })
  async getAllUnreadLetterList(
    @CurrentUser() user,
  ): Promise<ResponseEntity<LetterDto[]>> {
    const letterDto = await this.letterService.getAllUnreadLetterList(user.id);

    return new ResponseEntity<LetterDto[]>().ok().body(letterDto);
  }

  @Get('/read/list')
  @ApiResponseEntity({ summary: '확인한 편지 리스트' })
  async getAllReadLetterList(
    @CurrentUser() user,
  ): Promise<ResponseEntity<LetterDto[]>> {
    const letterDto = await this.letterService.getAllUnreadLetterList(user.id);

    return new ResponseEntity<LetterDto[]>().ok().body(letterDto);
  }
}
