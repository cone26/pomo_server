import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginInDto } from '../auth/dto/auth-login-in-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@app/dao/common/user/user.repository';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository, process.env.DB_NAME_COMMON)
    private readonly userRepository: UserRepository,
  ) {}

  async signIn(authLoginInDto: AuthLoginInDto): Promise<any> {
    const user = await this.userRepository.findByEmail(authLoginInDto.email);
    if (user?.password !== authLoginInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    // return result;
  }
  async findOne(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }
}
