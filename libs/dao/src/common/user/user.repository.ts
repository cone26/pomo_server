import { Repository } from 'typeorm';
import { EntityRepository } from '@libs/common/database/typeorm/typeorm-ex.decorator';
import { User } from '@libs/dao/common/user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.email=:email', { email: email })
      .getOne();
  }

  async findById(id: number): Promise<User> {
    return await this.createQueryBuilder('user')
      .where(`user.id=:id`, { id: id })
      .getOne();
  }
}
