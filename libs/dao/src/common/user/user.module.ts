import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TypeOrmExModule } from '@libs/common/database/typeorm/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forFeature([UserRepository], process.env.DB_COMMON_NAME),
  ],
  exports: [TypeOrmExModule],
})
export class UserModule {}
