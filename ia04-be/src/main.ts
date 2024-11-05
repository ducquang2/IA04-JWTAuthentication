import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [
      'https://ia-04-jwt-authentication.vercel.app',
      /\.ia-04-jwt-authentication\.vercel\.app$/,
      'http://localhost:5173',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
