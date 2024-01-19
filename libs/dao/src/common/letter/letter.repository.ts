import { Repository } from 'typeorm';
import { EntityRepository } from '@libs/common/database/typeorm/typeorm-ex.decorator';
import { Letter } from '@libs/dao/common/letter/letter.entity';
import { LETTER_STATUS } from '@libs/common/constants/letter.constatns';

@EntityRepository(Letter)
export class LetterRepository extends Repository<Letter> {
  async findById(id: number): Promise<Letter> {
    return await this.createQueryBuilder('letter')
      .where('letter.id=:id', { id: id })
      .getOne();
  }

  async findUnreadLetters(userId: number): Promise<Letter[]> {
    return await this.createQueryBuilder('letter')
      .where('letter.user_id=:userId', { userId: userId })
      .andWhere('letter.status=:status', { status: LETTER_STATUS.UNREAD })
      .getMany();
  }

  async findReadLetters(userId: number): Promise<Letter[]> {
    return await this.createQueryBuilder('letter')
      .where('letter.user_id=:userId', { userId: userId })
      .andWhere('letter.status=:status', { status: LETTER_STATUS.READ })
      .getMany();
  }
}
