import { Repository } from 'typeorm';
import { EntityRepository } from '@libs/common/database/typeorm/typeorm-ex.decorator';
import { Friend } from '@libs/dao/common/friend/friend.entity';
import { FRIEND_STATUS } from '@libs/common/constants/friend.constants';

@EntityRepository(Friend)
export class FriendRepository extends Repository<Friend> {
  async findById(id: number): Promise<Friend> {
    return await this.createQueryBuilder('friend')
      .where('friend.id=:id', { id: id })
      .getOne();
  }

  async findFriends(userId: number): Promise<Friend[]> {
    return await this.createQueryBuilder('friend')
      .where('friend.user_id=:userId', { userId: userId })
      .andWhere('friend.status=:status', { status: FRIEND_STATUS.FRIEND })
      .getMany();
  }

  async findFriendsInvitation(userId: number): Promise<Friend[]> {
    return await this.createQueryBuilder('friend')
      .where('friend.user_id=:userId', { userId: userId })
      .andWhere('friend.status=:status', { status: FRIEND_STATUS.PROCESS })
      .getMany();
  }
}
