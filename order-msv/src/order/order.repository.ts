import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    const { product, address, phone, email, userId } = createOrderDto;
    const order = new Order();
    order.product = product;
    order.address = address;
    order.phone = phone;
    order.email = email;
    order.userId = userId;

    try {
      await order.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
