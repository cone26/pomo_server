import { Repository, UpdateResult } from 'typeorm';
import { EntityRepository } from '@libs/common/database/typeorm/typeorm-ex.decorator';
import { Letter } from '@libs/dao/common/letter/letter.entity';
import { LETTER_STATUS } from '@libs/common/constants/letter.constatns';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { QueryMethodUpdateOptions } from '@libs/common/database/typeorm/typeorm-ex.module';
import { Friend } from '@libs/dao/common/friend/friend.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Letter)
export class LetterRepository extends Repository<Letter> {
  async findById(id: number): Promise<Letter> {
    return await this.createQueryBuilder('letter')
      .where('letter.id=:id', { id: id })
      .getOne();
  }

  async findUnreadLetters(userId: number): Promise<Letter[]> {
    return await this.createQueryBuilder('letter')
      .where('letter.to_user=:userId', { userId: userId })
      .andWhere('letter.status=:status', { status: LETTER_STATUS.UNREAD })
      .getMany();
  }

  async findReadLetters(userId: number): Promise<Letter[]> {
    return await this.createQueryBuilder('letter')
      .where('letter.to_user=:userId', { userId: userId })
      .andWhere('letter.status=:status', { status: LETTER_STATUS.READ })
      .getMany();
  }

  async updateById<Entity>(
    id: number,
    values: QueryDeepPartialEntity<Entity>,
    updateOptions?: QueryMethodUpdateOptions,
  ): Promise<UpdateResult> {
    const result = await this.createQueryBuilder('letter')
      .update(Letter)
      .set(values)
      .where('letter.id=:id', { id: id })
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
