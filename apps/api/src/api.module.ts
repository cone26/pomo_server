import { Module } from '@nestjs/common';
import { ApiService } from './default/api.service';
import { ApiController } from './default/api.controller';
import { ApiServerConfig } from './config/api.server.config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ApiServerConfig, AuthModule],
  controllers: [ApiController, AuthController],
  providers: [ApiService, AuthService, UserService],
})
export class ApiModule {}
