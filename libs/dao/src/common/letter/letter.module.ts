import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@libs/common/database/typeorm/typeorm-ex.module';
import { LetterRepository } from '@libs/dao/common/letter/letter.repository';

@Module({
  imports: [
    TypeOrmExModule.forFeature([LetterRepository], process.env.DB_COMMON_NAME),
  ],
  exports: [TypeOrmExModule],
})
export class LetterModule {}
