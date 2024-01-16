import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginInDto } from '../auth/dto/auth-login-in-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { User } from '@libs/dao/common/user/user.entity';

// export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository, process.env.DB_COMMON_NAME)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(authLoginInDto: AuthLoginInDto): Promise<any> {
    const user = await this.userRepository.findByEmail(authLoginInDto.email);

    if (user?.password !== authLoginInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
  async findUser(id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }
}
