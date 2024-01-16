import { Module } from '@nestjs/common';
import { ApiService } from './default/api.service';
import { ApiController } from './default/api.controller';
import { ApiServerConfig } from './config/api.server.config';
import { TypeOrmExModule } from '@libs/common/database/typeorm/typeorm-ex.module';
import { commonTypeOrmModuleOptions } from '@libs/common/database/typeorm/typeorm-module.option';
import { UserModule } from '@libs/dao/common/user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { LetterModule } from '@libs/dao/common/letter/letter.module';
import { FriendModule } from '@libs/dao/common/friend/friend.module';
import { FriendController } from './friend/friend.controller';
import { FriendService } from './friend/friend.service';
import { LetterController } from './letter/letter.controller';
import { LetterService } from './letter/letter.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';

@Module({
  imports: [
    //config
    ApiServerConfig,

    // mysql module
    TypeOrmExModule.forRoot(commonTypeOrmModuleOptions),

    // auth module
    AuthModule,

    // dao module
    UserModule,
    LetterModule,
    FriendModule,
  ],
  controllers: [
    ApiController,
    AuthController,
    UserController,
    FriendController,
    LetterController,
    ProfileController,
  ],
  providers: [ApiService, AuthService, UserService, FriendService, LetterService, ProfileService],
})
export class ApiModule {}
