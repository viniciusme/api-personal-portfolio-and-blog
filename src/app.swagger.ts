import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const { version, name } = require('../package.json');

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${name}`)
    .addBearerAuth()
    .setDescription(
      'A Tecnologia da Informação (ou, em inglês, Information Technology — IT) pode ser definida como o conjunto de todas as atividades e soluções providas por recursos computacionais que visam permitir a obtenção, o armazenamento, a proteção, o processamento, o acesso, o gerenciamento e o uso das informações.\n\n😍 API com NestJS + TypeORM + MYSQL + Swagger + class-validator + passportjs + bcryptjs + nest-acess-control + JWT desenvolvida para meu portfólio pessoal e blog.',
    )
    .setVersion(`${version}`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
