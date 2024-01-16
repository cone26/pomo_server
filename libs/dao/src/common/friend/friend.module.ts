import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@libs/common/database/typeorm/typeorm-ex.module';
import { FriendRepository } from '@libs/dao/common/friend/friend.repository';

@Module({
  imports: [
    TypeOrmExModule.forFeature([FriendRepository], process.env.DB_COMMON_NAME),
  ],
  exports: [TypeOrmExModule],
})
export class FriendModule {}
