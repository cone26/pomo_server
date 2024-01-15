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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    // return result;
  }
  async findUser(id: number): Promise<User> {
    // const test = await this.userRepository.save(
    //   new User({
    //     email: 'test2@test.com',
    //     password: 'test2',
    //     nickName: 'test2',
    //   }),
    // );
    return await this.userRepository.findById(id);
  }
}
