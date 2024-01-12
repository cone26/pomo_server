import { EntityRepository } from '@app/common/database/typeorm/typeorm-ex.decorator';
import { User } from '@app/dao/common/user/user.entity';
import { Repository } from 'typeorm';

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
