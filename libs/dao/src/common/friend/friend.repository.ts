import { Repository, UpdateResult } from 'typeorm';
import { EntityRepository } from '@libs/common/database/typeorm/typeorm-ex.decorator';
import { Friend } from '@libs/dao/common/friend/friend.entity';
import { FRIEND_STATUS } from '@libs/common/constants/friend.constants';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { QueryMethodUpdateOptions } from '@libs/common/database/typeorm/typeorm-ex.module';
import { InternalServerErrorException } from '@nestjs/common';

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
      .andWhere('friend.process=:process', { process: FRIEND_STATUS.FRIEND })
      .getMany();
  }

  async findFriendsRequest(userId: number): Promise<Friend[]> {
    return await this.createQueryBuilder('friend')
      .where('friend.user_id=:userId', { userId: userId })
      .andWhere('friend.process=:process', { process: FRIEND_STATUS.PROCESS })
      .getMany();
  }

  async findRequest(userId: number, targetUserId: number): Promise<Friend> {
    return await this.createQueryBuilder('friend')
      .where('friend.user_id=:userId', { userId: userId })
      .andWhere('friend.friend_id=:targetUserId', {
        targetUserId: targetUserId,
      })
      .getOne();
  }

  async updateById<Entity>(
    id: number,
    values: QueryDeepPartialEntity<Entity>,
    updateOptions?: QueryMethodUpdateOptions,
  ): Promise<UpdateResult> {
    const result = await this.createQueryBuilder('friend')
      .update(Friend)
      .set(values)
      .where('friend.id=:id', { id: id })
      .execute();

    if (!result.affected && updateOptions?.code) {
      throw new InternalServerErrorException(
        updateOptions?.code,
        updateOptions?.message,
      );
    }

    return result;
  }
}
