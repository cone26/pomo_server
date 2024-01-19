import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LetterDto } from '@libs/dao/common/letter/letter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { LetterRepository } from '@libs/dao/common/letter/letter.repository';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';

@Injectable()
export class LetterService {
  constructor(
    @InjectRepository(UserRepository, process.env.DB_COMMON_NAME)
    private readonly userRepository: UserRepository,
    @InjectRepository(LetterRepository, process.env.DB_COMMON_NAME)
    private readonly letterRepository: LetterRepository,
  ) {}
  async getAllUnreadLetterList(userId: number): Promise<LetterDto[]> {
    const currentUser = await this.userRepository.findById(userId);
    if (!currentUser) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }

    const letters = await this.letterRepository.findUnreadLetters(
      currentUser.id,
    );

    return letters.map((it) => LetterDto.fromEntity(it));
  }

  async getAllReadLetterList(userId: number): Promise<LetterDto[]> {
    const currentUser = await this.userRepository.findById(userId);
    if (!currentUser) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }

    const letters = await this.letterRepository.findReadLetters(currentUser.id);

    return letters.map((it) => LetterDto.fromEntity(it));
  }
}
