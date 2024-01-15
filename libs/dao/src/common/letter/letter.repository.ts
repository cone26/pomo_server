import { Repository } from 'typeorm';
import { EntityRepository } from '@libs/common/database/typeorm/typeorm-ex.decorator';
import { Letter } from '@libs/dao/common/letter/letter.entity';

@EntityRepository(Letter)
export class LetterRepository extends Repository<Letter> {
  async findById(id: number): Promise<Letter> {
    return await this.createQueryBuilder('letter')
      .where('letter.id=:id', { id: id })
      .getOne();
  }
}
