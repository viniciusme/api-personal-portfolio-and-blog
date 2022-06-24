import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  await app.listen(port);
  logger.log(`<< Servidor rodando na porta: ${await app.getUrl()} >>`);
}
bootstrap();
