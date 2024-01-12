import { Module } from '@nestjs/common';
import { ApiService } from './default/api.service';
import { ApiController } from './default/api.controller';
import { ApiServerConfig } from './config/api.server.config';
import { TypeOrmExModule } from '@libs/common/database/typeorm/typeorm-ex.module';
import { commonTypeOrmModuleOptions } from '@libs/common/database/typeorm/typeorm-module.option';
import { UserModule } from '@libs/dao/common/user/user.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
// import { UserService } from './user/user.service';
// import { AuthModule } from './auth/auth.module';
// import { UserController } from './user/user.controller';

@Module({
  imports: [
    //config
    ApiServerConfig,

    // mysql module
    TypeOrmExModule.forRoot(commonTypeOrmModuleOptions),

    // auth module
    // AuthModule,

    // dao module
    UserModule,
  ],
  controllers: [
    ApiController,
    // AuthController,
    // UserController
  ],
  providers: [
    ApiService,
    // AuthService,
    // UserService
  ],
})
export class ApiModule {}
