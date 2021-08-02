import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('coupon')
export class CouponController {
  //@Get()
  @MessagePattern('get-coupon')
  getCoupon(): number {
    const coupon = Math.random();
    if (coupon <= 0.5) {
      return 1;
    } else return 0;
  }
}
