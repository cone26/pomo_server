import { Module } from '@nestjs/common';
import { ApiServer } from './api.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ApiServer],
})
export class ApiModule {}
