import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { writeFileSync } from 'fs';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Receta')
    .addBearerAuth()
    .setDescription(
      'Esta es una API Gateway creada con NestJS para servicios de receta electrónica',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  writeFileSync('./swagger-spec.json', JSON.stringify(document));

  SwaggerModule.setup('/api', app, document);
  // SwaggerModule.setup('/api', app, document, {
  //   swaggerOptions: {
  //     requestInterceptor: (req) => {
  //       req.credentials = 'include';
  //       return req;
  //     },
  //   },
  // });
};
