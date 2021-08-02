import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
  ): Promise<void> {
    return this.orderService.createOrder(createOrderDto);
  }
}
