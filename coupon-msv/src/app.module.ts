import { Module } from '@nestjs/common';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [CouponModule],
})
export class AppModule {}
