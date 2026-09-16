import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Auto-validate request bodies against DTO definitions
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties not defined in DTO
      forbidNonWhitelisted: true, // Throws error if unknown properties are passed
      transform: true, // Automatically converts primitives to match DTO types
    }),
  );

  await app.listen(3000);
}
bootstrap();