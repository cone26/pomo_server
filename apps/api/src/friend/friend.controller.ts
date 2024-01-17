import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FriendService } from './friend.service';
import { CurrentUser } from '@libs/common/decorator/current-user.decorator';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { FriendOutDto } from './dto/friend-out.dto';

@ApiTags('friend')
@Controller('friend')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('/accepted')
  async getAllFriends(
    @CurrentUser() user,
  ): Promise<ResponseEntity<FriendOutDto[]>> {
    const friendsDto = await this.friendService.getAllFriends(user.id);

    return new ResponseEntity<FriendOutDto[]>().ok().body(friendsDto);
  }

  @Get('/unaccepted')
  async getAllUnacceptedFriends(
    @CurrentUser() user,
  ): Promise<ResponseEntity<FriendOutDto[]>> {
    const friendsDto = await this.friendService.getAllUnacceptedFriends(
      user.id,
    );

    return new ResponseEntity<FriendOutDto[]>().ok().body(friendsDto);
  }
}
