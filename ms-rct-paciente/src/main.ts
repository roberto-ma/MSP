/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2022-02-16 15:02:00
 * @ Modified by: Anthony Loyaga
 * @ Modified time: 2022-04-04 15:20:34
 * @ Description:
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT) || 3101;
  const HOST = process.env.HOST || 'localhost';

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    logger: ['error', 'warn', 'debug', 'log'],
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: HOST,
      port: PORT,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen().then(() => {
    Logger.log(`${HOST} escuchando en el puerto ${PORT}`, 'ms-rct-paciente');
  });
}
bootstrap();
