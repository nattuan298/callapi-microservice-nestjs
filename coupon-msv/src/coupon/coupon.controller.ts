import { Controller, Get } from '@nestjs/common';

@Controller('coupon')
export class CouponController {
  @Get()
  addCoupon(): number {
    const coupon = Math.random();
    if (coupon <= 0.5) {
      return 1;
    } else return 0;
  }
}
