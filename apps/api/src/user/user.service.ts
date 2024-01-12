// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthLoginInDto } from '../auth/dto/auth-login-in-dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from '@app/dao/common/user/user.repository';
// import { JwtService } from '@nestjs/jwt';
//
// export type User = any;
//
// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(UserRepository, process.env.DB_COMMON_NAME)
//     private readonly userRepository: UserRepository,
//     private jwtService: JwtService,
//   ) {}
//
//   async signIn(authLoginInDto: AuthLoginInDto): Promise<any> {
//     const user = await this.userRepository.findByEmail(authLoginInDto.email);
//     if (user?.password !== authLoginInDto.password) {
//       throw new UnauthorizedException();
//     }
//     const payload = { email: user.email, password: '0' };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     // const { password, ...result } = user;
//     // TODO: Generate a JWT and return it here
//     // instead of the user object
//     // return result;
//   }
//   async findUser(id: number): Promise<User> {
//     return await this.userRepository.findById(id);
//   }
// }
