import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Query,
  Patch,
  DefaultValuePipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { GetOrderFilterDto } from './dto/get-order-filter.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The order has been successfully created.',
    type: CreateOrderDto,
  })
  createOrder(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
  ): Promise<void> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiCreatedResponse({ type: Order })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit = 3,
  ): Promise<Pagination<Order>> {
    limit = limit > 10 ? 10 : limit;
    return this.orderService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/orders',
    });
  }

  @Get('/:id')
  @ApiCreatedResponse({ type: Order })
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateOrderDto })
  @ApiCreatedResponse({
    description: 'The order has been successfully updated.',
    type: UpdateOrderDto,
  })
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete('/:id')
  @ApiCreatedResponse({
    description: 'The order has been successfully deleted.',
  })
  deleteOrderById(@Param('id', ParseIntPipe) id: number): void {
    this.orderService.deleteOrderById(id);
  }
}
