import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ApiServer } from './api.server';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function api() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiModule,
    new FastifyAdapter(),
  );

  const apiServer = new ApiServer(app);
  await apiServer.init();
  await apiServer.run();
}

api();
