import { Controller, Get } from '@nestjs/common';

@Controller('coupon')
export class CouponController {
  @Get()
  getCoupon(): number {
    const coupon = Math.random();
    if (coupon <= 0.5) {
      return 0;
    } else return 1;
  }
}
