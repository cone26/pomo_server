import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiServerConfig } from '../../api/src/config/api.server.config';
import { commonTypeOrmModuleOptions } from '@app/common/database/typeorm/typeorm-module.option';

@Module({
  imports: [
    //api config
    ApiServerConfig,
    TypeOrmModule.forRoot(commonTypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
