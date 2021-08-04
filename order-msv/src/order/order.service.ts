import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderFilterDto } from './dto/get-order-filter.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.createOrder(createOrderDto);
  }

  async getOrders(filterDto: GetOrderFilterDto): Promise<Order[]> {
    return this.orderRepository.getOrders(filterDto);
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return order;
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const { productId, address, phone, email, userId } = updateOrderDto;
    const order = await this.getOrderById(id);

    order.productId = productId;
    order.address = address;
    order.phone = phone;
    order.email = email;
    order.userId = userId;
    await order.save();
    return order;
  }

  async deleteOrderById(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Order>> {
    const queryBuilder = this.orderRepository.createQueryBuilder('order');
    queryBuilder.orderBy('order.id', 'DESC'); // Or whatever you need to do
    return paginate<Order>(queryBuilder, options);
  }
}
