import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// Create micro service options
const microserviceOptions = {
  name: 'COUPON_SERVICE',
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379',
  },
};
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
