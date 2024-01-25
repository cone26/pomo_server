import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { CurrentUser } from '@libs/common/decorator/current-user.decorator';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { LetterDto } from '@libs/dao/common/letter/letter.dto';
import { LetterService } from './letter.service';
import { SendLetterInDto } from './dto/send-letter-in.dto';
import { FriendDto } from '@libs/dao/common/friend/friend.dto';
import { FriendRequestInDto } from '../friend/dto/friend-request-in.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('letter')
@Controller('letter')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
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
    const letterDto = await this.letterService.getAllReadLetterList(user.id);

    return new ResponseEntity<LetterDto[]>().ok().body(letterDto);
  }

  @Get('/:id')
  @ApiResponseEntity({ summary: '편지 조회' })
  async getLetter(
    @CurrentUser() user,
    @Param('id') id: number,
  ): Promise<ResponseEntity<LetterDto>> {
    const letterDto = await this.letterService.getLetter(user.id, id);

    return new ResponseEntity<LetterDto>().ok().body(letterDto);
  }

  @Post('request')
  @ApiResponseEntity({ type: LetterDto, summary: '편지 등록' })
  async sendLetter(
    @CurrentUser() user,
    @Body() sendLetterInDto: SendLetterInDto,
  ): Promise<ResponseEntity<LetterDto[]>> {
    const letterDto = await this.letterService.sendLetter(
      user.id,
      sendLetterInDto,
    );

    return new ResponseEntity<LetterDto[]>().ok().body(letterDto);
  }
}
