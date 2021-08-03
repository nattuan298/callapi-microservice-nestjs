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

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    return this.orderRepository.createOrder(createOrderDto);
  }

  async getOrders(filterDto: GetOrderFilterDto): Promise<Order[]> {
    return this.orderRepository.getOrders(filterDto);
  }

  async getOrderById(id: number): Promise<Order> {
    return this.findOrderById(id);
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const { product, address, phone, email, userId } = updateOrderDto;
    const order = await this.findOrderById(id);

    order.product = product;
    order.address = address;
    order.phone = phone;
    order.email = email;
    order.userId = userId;
    return await order.save();
  }

  async deleteOrderById(id: number): Promise<Order> {
    const order = await this.findOrderById(id);
    return order.remove();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Order>> {
    const queryBuilder = this.orderRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.userId', 'DESC'); // Or whatever you need to do

    return paginate<Order>(queryBuilder, options);
  }

  private async findOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException(`Can not found order with ID: ${id}`);
    }
    return order;
  }
}
