import config from 'config';
import compression from "compression";
import fileUpload from 'express-fileupload';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './common.module/log/middleware/logger.middleware';
import { GlobalExceptionsFilter } from './common.module/exception/global-exception.filter';

async function bootstrap() {
  const serverConfig = config.get<{ port: number }>('server');

  const app = await NestFactory.create(AppModule, { cors: true });
  const { httpAdapter } = app.get(HttpAdapterHost);


  const swaggerConfig = new DocumentBuilder()
    .setTitle('')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 * 1024 }}) )
    .use(compression())
    .use(logger)
    .useGlobalFilters(new GlobalExceptionsFilter(httpAdapter));


  await app.listen(serverConfig.port);
}

bootstrap().then();
