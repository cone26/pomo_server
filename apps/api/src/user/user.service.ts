import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginInDto } from '../auth/dto/auth-login-in-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { User } from '@libs/dao/common/user/user.entity';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { UserDto } from '@libs/dao/common/user/user.dto';

// export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository, process.env.DB_COMMON_NAME)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
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
}
