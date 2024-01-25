import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginInDto } from '../auth/dto/auth-login-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { User } from '@libs/dao/common/user/user.entity';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { UserDto } from '@libs/dao/common/user/user.dto';
import { AuthSignupInDto } from '../auth/dto/auth-signup-in.dto';

// export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository, process.env.DB_COMMON_NAME)
    private readonly userRepository: UserRepository,
  ) {}

  async signIn(authLoginInDto: AuthLoginInDto): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(authLoginInDto.email);
    if (!(await user.checkPassword(authLoginInDto.password))) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_MISMATCHED_PASSWORD,
        'USER_MISMATCHED_PASSWORD',
      );
    }

    // const accessToken = await this.jwtService.signAsync(payload);

    return UserDto.fromEntity(user);
  }

  async signup(authSignupInDto: AuthSignupInDto): Promise<UserDto> {
    const isUserNicknameExists = await this.userRepository.findByNickname(
      authSignupInDto.nickname,
    );

    if (isUserNicknameExists) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_CONFLICT_NICKNAME,
        'USER_CONFLICT_NICKNAME',
      );
    }

    // create a user
    const userDto = await this.userRepository.save(
      new User({
        nickName: authSignupInDto.nickname,
        email: authSignupInDto.email,
        password: authSignupInDto.password,
      }),
    );

    // create a profile -> ??

    return UserDto.fromEntity(userDto);
  }
}
