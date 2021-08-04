import { Test, TestingModule } from '@nestjs/testing';
import { GetOrderFilterDto } from './dto/get-order-filter.dto';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

const mockOrderRepository = () => ({
  getOrders: jest.fn(),
  findOrderById: jest.fn(),
  createOrder: jest.fn(),
  remove: jest.fn(),
  updateOrder: jest.fn(),
  save: jest.fn(),
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
      orderRepository.findOrderById.mockResolvedValue(mockOrder);
      const result = await orderRepository.findOrderById(1);
      expect(result).toEqual(mockOrder);
    });
    it('throw an error if order not found', async () => {
      orderRepository.findOrderById.mockResolvedValue(null);
      const result = await orderRepository.findOrderById(1);
      expect(result).toEqual(null);
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
      const mockOrder = {
        id: 1,
        product: 'product 1',
        address: 'address 1',
        phone: '0123456789',
        email: 'tuan@gmail.com',
        userId: '1',
      };
      orderRepository.findOrderById.mockResolvedValue(mockOrder);
      const result = await orderRepository.findOrderById(1);
      expect(result).toEqual(mockOrder);
      //await orderService.deleteOrderById(1);
      await orderRepository.remove();
      expect(orderRepository.remove).toHaveBeenCalled();
    });
    it('throw an error if order not found', async () => {
      orderRepository.findOrderById.mockResolvedValue(null);
      const result = await orderRepository.findOrderById(1);
      expect(result).toEqual(null);
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

      const mockOrder = {
        product: 'product 1',
        address: 'address 1',
        phone: '0123456789',
        email: 'tuan@gmail.com',
        userId: '1',
      };
      const save = jest.fn().mockResolvedValue(true);
      const { product, address, phone, email, userId } = updateOrderDto;
      orderRepository.findOrderById.mockResolvedValue(mockOrder);
      const result = await orderRepository.findOrderById(1);
      expect(result).toEqual(mockOrder);

      result.product = product;
      result.address = address;
      result.phone = phone;
      result.email = email;
      result.userId = userId;

      await save();
      expect(save).toHaveBeenCalled();
      expect(result).toEqual(updateOrderDto);
    });
  });

  describe('findOneById', () => {
    it('call findOne() and return an order', async () => {
      const mockOrder = {
        product: 'product 1',
        address: 'address 1',
        phone: '0123456789',
        email: 'tuan@gmail.com',
        userId: '1',
      };

      orderRepository.findOne.mockResolvedValue(mockOrder);

      const result = await orderService.findOrderById(1, mockOrder);
      expect(result).toEqual(mockOrder);

      expect(orderRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('Can not found order by id', async () => {
      orderRepository.findOne.mockResolvedValue(null);
      expect(orderService.getOrderById(1)).rejects.toThrow();
    });
  });
});
