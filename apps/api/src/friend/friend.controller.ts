import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FriendService } from './friend.service';
import { CurrentUser } from '@libs/common/decorator/current-user.decorator';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { FriendOutDto } from './dto/friend-out.dto';
import { FriendDto } from '@libs/dao/common/friend/friend.dto';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { FriendRequestInDto } from './dto/friend-request-in.dto';

@ApiTags('friend')
@Controller('friend')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  @ApiResponseEntity({ summary: '로그인 토큰 인증' })
  async getAllFriends(
    @CurrentUser() user,
  ): Promise<ResponseEntity<FriendOutDto[]>> {
    const friendsDto = await this.friendService.getAllFriends(user.id);

    return new ResponseEntity<FriendOutDto[]>().ok().body(friendsDto);
  }

  @Get('/requests')
  @ApiResponseEntity({ summary: '로그인 토큰 인증' })
  async getAllUnacceptedFriends(
    @CurrentUser() user,
  ): Promise<ResponseEntity<FriendOutDto[]>> {
    const friendsDto = await this.friendService.getAllUnacceptedFriends(
      user.id,
    );

    return new ResponseEntity<FriendOutDto[]>().ok().body(friendsDto);
  }

  @Post('request')
  @ApiResponseEntity({ type: FriendDto, summary: '로그인 토큰 인증' })
  async sendRequestFriend(
    @CurrentUser() user,
    @Body() friendRequestInDto: FriendRequestInDto,
  ): Promise<ResponseEntity<FriendDto>> {
    const requestDto = await this.friendService.sendRequestFriend(
      user.id,
      friendRequestInDto,
    );

    return new ResponseEntity<FriendDto>().ok().body(requestDto);
  }
}
