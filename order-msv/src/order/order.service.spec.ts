import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GetOrderFilterDto } from './dto/get-order-filter.dto';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

const mockOrderRepository = () => ({
  getOrders: jest.fn(),
  createOrder: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
});

describe('OrderService', () => {
  let orderService;
  let orderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useFactory: mockOrderRepository,
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
  });

  describe('getOrders', () => {
    it('get all orders from the repository', async () => {
      orderRepository.getOrders.mockResolvedValue('someValue');

      expect(orderRepository.getOrders).not.toHaveBeenCalled();

      const filter: GetOrderFilterDto = { search: 'tuan' };
      const result = await orderService.getOrders(filter);
      expect(orderRepository.getOrders).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getOrderById', () => {
    it('call orderRepository.findOne() and return the order', async () => {
      const mockOrder = {
        product: 'product 1',
        address: 'address 1',
        phone: '0123456789',
        email: 'tuan@gmail.com',
        userId: '1',
      };
      orderRepository.findOne.mockResolvedValue(mockOrder);

      const result = await orderService.getOrderById(1);
      expect(result).toEqual(mockOrder);

      expect(orderRepository.findOne).toHaveBeenCalledWith(1);
    });
    it('throw an error if order not found', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      expect(orderService.getOrderById(1)).rejects.toThrow();
    });
  });

  describe('createOrder', () => {
    it('Call orderRepository.create() and return the result', async () => {
      orderRepository.createOrder.mockResolvedValue('someOrder');

      expect(orderRepository.createOrder).not.toHaveBeenCalled();

      const createOrderDto = {
        product: 'product 1',
        address: 'address 1',
        phone: '0123456789',
        email: 'tuan@gmail.com',
        userId: '1',
      };

      const result = await orderService.createOrder(createOrderDto);
      expect(orderRepository.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual('someOrder');
    });
  });

  describe('deleteOrder', () => {
    it('delete a order', async () => {
      orderRepository.delete.mockResolvedValue({ affected: 1 });
      expect(orderRepository.delete).not.toHaveBeenCalled();
      await orderService.deleteOrderById(1);
      expect(orderRepository.delete).toHaveBeenCalledWith(1);
    });
    it('throw an error if order not found', async () => {
      orderRepository.delete.mockResolvedValue({ affected: 0 });
      expect(orderService.deleteOrderById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateOrder', () => {
    it('updates an order successful', async () => {
      const updateOrderDto = {
        product: 'product 1',
        address: 'address 1',
        phone: '0123456789',
        email: 'tuan@gmail.com',
        userId: '1',
      };

      const save = jest.fn().mockResolvedValue(true);
      const { product, address, phone, email, userId } = updateOrderDto;
      orderService.getOrderById = jest.fn().mockResolvedValue({
        product,
        address,
        phone,
        email,
        userId,
        save,
      });

      expect(orderService.getOrderById).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
      const result = await orderService.updateOrder(1, updateOrderDto);
      expect(orderService.getOrderById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.product).toEqual(updateOrderDto.product);
    });
  });
});
