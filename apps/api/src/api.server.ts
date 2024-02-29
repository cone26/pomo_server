import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestApplication } from '@nestjs/core';

export class ApiServer {
  constructor(private readonly app: NestFastifyApplication) {}

  async init() {
    // CORS
    this.app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // OPENAPI : swagger
    const document = SwaggerModule.createDocument(
      this.app,
      new DocumentBuilder()
        .setTitle('API')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBasicAuth(
          {
            type: 'http',
            name: 'Authorization',
            in: 'header',
            description: 'basic auth',
          },
          'basic',
        )
        .addBearerAuth(
          {
            type: 'http',
            name: 'Authorization',
            in: 'header',
            description: 'jwt auth',
          },
          'jwt',
        )
        .addBearerAuth(
          {
            type: 'http',
            name: 'Authorization',
            in: 'header',
            description: 'refresh token',
          },
          'jwt-refresh',
        )
        .addApiKey(
          {
            type: 'apiKey',
            name: 'X-API-KEY',
            in: 'header',
            description: 'luxon internal api',
          },
          'apiKey',
        )
        .build(),
      {},
    );
    SwaggerModule.setup('api-docs', this.app, document);

    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        disableErrorMessages: false,
      }),
    );
  }

  async run() {
    const port = process.env.SERVER_PORT || 3000;
    await this.app.listen(port, '0.0.0.0');
  }
}
