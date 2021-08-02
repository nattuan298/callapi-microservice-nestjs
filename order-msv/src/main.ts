import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 1000,
    },
  });
  await app.listen(3000);
}
bootstrap();
