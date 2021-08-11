import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  await app.listen(3000);
}
bootstrap();
