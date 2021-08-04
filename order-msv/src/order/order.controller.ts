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
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LocalAuthGuard } from '../auth/local-guard.guard';

@ApiBearerAuth()
@UseGuards(LocalAuthGuard)
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
  ): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiCreatedResponse({ type: Order, status: 200 })
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
      route: 'http://localhost:3000/orders/',
    });
  }

  @Get('/:id')
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateOrderDto })
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete('/:id')
  deleteOrderById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderService.deleteOrderById(id);
  }
}
