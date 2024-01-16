import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRepository } from '@libs/dao/common/friend/friend.repository';
import { FriendOutDto } from './dto/friend-out.dto';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendRepository, process.env.DB_COMMON_NAME)
    private readonly friendRepository: FriendRepository,

    @InjectRepository(UserRepository, process.env.DB_COMMON_NAME)
    private readonly userRepository: UserRepository,
  ) {}

  async getAllFriends(userId: number): Promise<FriendOutDto[]> {
    const currentUser = await this.userRepository.findById(userId);
    if (!currentUser) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }

    const friendsDto = await this.friendRepository.findFriendsExcepted(userId);

    return friendsDto.map((it) => {
      return FriendOutDto.fromEntity(it);
    });
  }
}
