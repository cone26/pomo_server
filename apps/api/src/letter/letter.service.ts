import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LetterDto } from '@libs/dao/common/letter/letter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { LetterRepository } from '@libs/dao/common/letter/letter.repository';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { LETTER_STATUS } from '@libs/common/constants/letter.constatns';

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

  async getLetter(userId: number, id: number): Promise<LetterDto> {
    const currentUser = await this.userRepository.findById(userId);
    // 이게 꼭 있어야 할까? -> 어차피 로그인 검증 거치고 jwt 토큰 계속 달고다니는디..
    if (!currentUser) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }

    const letter = await this.letterRepository.findById(id);
    if (!letter) {
      throw new InternalServerErrorException(
        InternalErrorCode.LETTER_NOT_FOUND,
        'LETTER_NOT_FOUND',
      );
    }

    if (letter.status !== LETTER_STATUS.READ) {
      letter.status = LETTER_STATUS.UNREAD;
      await this.letterRepository.updateById(letter.id, letter);
    }

    return LetterDto.fromEntity(letter);
  }
}
