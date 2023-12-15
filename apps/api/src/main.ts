import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ApiServer } from './api.service';

async function api() {
  const app = await NestFactory.create(ApiModule);

  const apiServer = new ApiServer(app);
  await apiServer.init();
  await apiServer.run();
}

api();
