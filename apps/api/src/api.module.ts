import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiServer } from './api.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiServer],
})
export class ApiModule {}
