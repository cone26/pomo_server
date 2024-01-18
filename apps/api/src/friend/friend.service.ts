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
import { FriendRequestAcceptInDto } from './dto/friend-request-accept-in.dto';
import { User } from '@libs/dao/common/user/user.entity';

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
      return FriendOutDto.fromEntity(
        await this.userRepository.findById(it.friendId),
      );
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

    const friendsDto = await this.friendRepository.findFriendsRequest(userId);

    return friendsDto.map((it) => {
      return FriendOutDto.fromEntity(
        // map에서 await
        await this.userRepository.findById(it.friendId),
      );
    });
  }

  async sendFriendRequest(
    userId: number,
    friendRequestInDto: FriendRequestInDto,
  ): Promise<FriendDto> {
    const targetFriend = await this.isUserAndTargetExists(
      userId,
      friendRequestInDto.targetNickname,
    );

    const createdRequest = await this.friendRepository.save(
      new Friend({
        userId: userId,
        friendId: targetFriend.id,
        process: FRIEND_STATUS.PROCESS,
      }),
    );

    return FriendDto.fromEntity(createdRequest);
  }

  async acceptFriendRequest(
    userId: number,
    friendRequestAcceptInDto: FriendRequestAcceptInDto,
  ): Promise<void> {
    const targetFriend = await this.isUserAndTargetExists(
      userId,
      friendRequestAcceptInDto.targetNickname,
    );

    const friendRequest = await this.friendRepository.findRequest(
      userId,
      targetFriend.id,
    );
    friendRequest.process = FRIEND_STATUS.FRIEND;
    await this.friendRepository.updateById(friendRequest.id, friendRequest);
  }

  // ========================= private method ====================

  private async isUserAndTargetExists(
    userId: number,
    targetNickname: string,
  ): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }

    const targetFriend =
      await this.userRepository.findByNickname(targetNickname);

    if (!targetFriend) {
      throw new InternalServerErrorException(
        InternalErrorCode.FRIEND_REQUEST_TARGET_USER_NOT_FOUND,
        'FRIEND_REQUEST_TARGET_USER_NOT_FOUND',
      );
    }

    return targetFriend;
  }
}
