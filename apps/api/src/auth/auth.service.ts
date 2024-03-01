import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_OPTIONS } from '../constants/jwt.constants';
import { UserService } from '../user/user.service';
import { AuthLoginInDto } from './dto/auth-login-in.dto';
import { UserDto } from '@libs/dao/common/user/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { User } from '@libs/dao/common/user/user.entity';
import { Column } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(UserRepository, process.env.DB_COMMON_NAME)
    private readonly userRepository: UserRepository,
  ) {}

  validateJwt(payload: any) {
    return !!payload.nickname && !!payload.email;
  }
  async saveUser(socialLoginInDto: AuthLoginInDto): Promise<object | UserDto> {
    const findUser = await this.userRepository.findByEmail(
      socialLoginInDto.email,
    );

    if (!findUser || findUser.socialProvider == 'GOOGLE') {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_ALREADY_EXISTS,
        'USER_ALREADY_EXISTS',
      );
    }

    const user = await this.userRepository.save(
      new User({
        email: socialLoginInDto.email,
        firstName: socialLoginInDto.firstName,
        lastName: socialLoginInDto.lastName,
        socialProvider: socialLoginInDto.socialProvider,
        externalId: socialLoginInDto.externalId,
        accessToken: socialLoginInDto.accessToken,
        // refreshToken: string;
      }),
    );

    return UserDto.fromEntity(user);
  }
  getAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: JWT_OPTIONS.expiresIn,
    });
  }

  verifyJwt(accessToken: string) {
    return this.jwtService.verify(accessToken, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }
}
