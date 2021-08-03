import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import axios from 'axios';
import { GetOrderFilterDto } from './dto/get-order-filter.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async getOrders(filterDto: GetOrderFilterDto): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    const { search } = filterDto;

    if (search) {
      query.andWhere('(order.email LIKE :search OR order.phone LIKE :search)', {
        search: `%${search}%`,
      });
    }
    const orders = await query.getMany();
    return orders;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    const coupon = await axios
      .get('http://localhost:3001/coupon')
      .then((res) => res.data);

    console.log('Hello' + coupon);

    const { product, address, phone, email, userId } = createOrderDto;
    const order = new Order();
    order.product = product;
    order.address = address;

    order.phone = phone;
    order.email = email;
    order.userId = userId;

    try {
      if (coupon === 0) {
        throw new BadRequestException(
          'Coupon not available, can not make an Order',
        );
      }
      await order.save();
    } catch (error) {
      throw new InternalServerErrorException('Error Here!');
    }
  }
}
