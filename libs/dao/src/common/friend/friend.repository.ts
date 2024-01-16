import { Repository } from 'typeorm';
import { EntityRepository } from '@libs/common/database/typeorm/typeorm-ex.decorator';
import { Friend } from '@libs/dao/common/friend/friend.entity';

@EntityRepository(Friend)
export class FriendRepository extends Repository<Friend> {
  async findById(id: number): Promise<Friend> {
    return await this.createQueryBuilder('friend')
      .where('friend.id=:id', { id: id })
      .getOne();
  }
}
