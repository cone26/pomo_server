import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiServerConfig } from '../../api/src/config/api.server.config';

@Module({
  imports: [
    //api config
    ApiServerConfig,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_COMMON_HOST,
      port: Number(process.env.DB_COMMON_PORT),
      username: process.env.DB_COMMON_USER,
      password: process.env.DB_COMMON_PW,
      database: process.env.DB_COMMON_NAME,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
