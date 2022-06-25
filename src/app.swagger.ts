import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const { version, name } = require('../package.json');

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${name}`)
    .setDescription(
      '😍 API com NestJS + TypeORM + MYSQL + Swagger desenvolvida para meu portfólio pessoal e blog.',
    )
    .setVersion(`${version}`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
