import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), OrderModule],
})
export class AppModule {}
