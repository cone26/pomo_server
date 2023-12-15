import { EntityRepository } from '@app/common/database/typeorm/typeorm-ex.decorator';
import { User } from '@app/dao/common/user/user.entity';
import { Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
