import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([OrderRepository])],
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
  });

  it('createOrder', async () => {
    const createOrder = jest.fn();

    const createOrderDto = {
      product: 'product 1',
      address: 'address 1',
      phone: '0123456789',
      email: 'tuan@gmail.com',
      userId: '1',
    };
    createOrder: jest.fn();
    orderController.createOrder();
    expect(orderController);
  });
});
