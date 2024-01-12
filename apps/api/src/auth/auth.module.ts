// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
// import { JWT_OPTIONS } from '../constants/jwt.constants';
// import { PassportModule } from '@nestjs/passport';
// import { UserModule } from '@app/dao/common/user/user.module';
// import { JwtStrategy } from './strategy/jwt.strategy';
//
// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.ACCESS_TOKEN_SECRET,
//       signOptions: { expiresIn: JWT_OPTIONS.expiresIn },
//     }),
//     UserModule,
//   ],
//   providers: [AuthService, UserService, JwtStrategy],
//   exports: [AuthService, JwtModule],
// })
// export class AuthModule {}
