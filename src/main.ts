import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './common.module/log/middleware/logger.middleware';
import { GlobalExceptionsFilter } from './common.module/exception/global-exception.filter';

async function bootstrap() {
  const serverConfig: { port: number } = config.get('server');

  const app = await NestFactory.create(AppModule);

  app.use(logger);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapter));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(serverConfig.port);
}

bootstrap().then();
