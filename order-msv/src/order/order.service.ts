import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @Inject('COUPON_SERVICE') private client: ClientProxy,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    return this.orderRepository.createOrder(createOrderDto);
  }
}
