import { Module } from '@nestjs/common';
import { ApiService } from './default/api.service';
import { ApiController } from './default/api.controller';
import { ApiServerConfig } from './config/api.server.config';

@Module({
  imports: [ApiServerConfig],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
