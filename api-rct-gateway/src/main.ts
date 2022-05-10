import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { initSwagger } from './app.swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  initSwagger(app);

  const config = app.get(ConfigService);
  app.set('trust proxy', config.get<string>('TRUST_PROXY_STATE'));

  const PORT = parseInt(config.get<string>('PORT'), 10);
  app.use(compression());
  await app.listen(PORT).then(() => {
    Logger.log(`Api gateway escuchando en el puerto ${PORT}`, 'GATEWAY');
  });
}
bootstrap();
