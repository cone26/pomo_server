import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRepository } from '@libs/dao/common/friend/friend.repository';
import { FriendOutDto } from './dto/friend-out.dto';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { FriendDto } from '@libs/dao/common/friend/friend.dto';
import { FriendRequestInDto } from './dto/friend-request-in.dto';
import { FRIEND_STATUS } from '@libs/common/constants/friend.constants';
import { Friend } from '@libs/dao/common/friend/friend.entity';

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

    const friendsDto = await this.friendRepository.findFriends(userId);

    return friendsDto.map((it) => {
      return FriendOutDto.fromEntity(it);
    });
  }

  async getAllUnacceptedFriends(userId: number): Promise<FriendOutDto[]> {
    const currentUser = await this.userRepository.findById(userId);
    if (!currentUser) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }

    const friendsDto =
      await this.friendRepository.findFriendsInvitation(userId);

    return friendsDto.map((it) => {
      return FriendOutDto.fromEntity(it);
    });
  }

  async sendRequestFriend(
    userId: number,
    friendRequestInDto: FriendRequestInDto,
  ): Promise<FriendDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }

    const targetFriend = await this.userRepository.findByNickname(
      friendRequestInDto.targetNickname,
    );

    if (!targetFriend) {
      throw new InternalServerErrorException(
        InternalErrorCode.FRIEND_REQUEST_TARGET_USER_NOT_FOUND,
        'FRIEND_REQUEST_TARGET_USER_NOT_FOUND',
      );
    }

    const createdRequest = await this.friendRepository.save(
      new Friend({
        userId: user.id,
        friendId: targetFriend.id,
        process: FRIEND_STATUS.PROCESS,
      }),
    );

    return FriendDto.fromEntity(createdRequest);
  }
}
