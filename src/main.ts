import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { SERVER_PORT } from './config/constants';
import { setDefaultUser } from './config/default-user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;

  initSwagger(app);
  // setDefaultUser(config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
  logger.log(`<< Servidor rodando na porta: ${await app.getUrl()} >>`);
}
bootstrap();
