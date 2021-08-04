"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OrderController = void 0;
var common_1 = require("@nestjs/common");
var create_order_dto_1 = require("./dto/create-order.dto");
var order_entity_1 = require("./entities/order.entity");
var update_order_dto_1 = require("./dto/update-order.dto");
var swagger_1 = require("@nestjs/swagger");
var local_guard_guard_1 = require("../auth/local-guard.guard");
var OrderController = /** @class */ (function () {
    function OrderController(orderService) {
        this.orderService = orderService;
    }
    OrderController.prototype.createOrder = function (createOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    };
    OrderController.prototype.index = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 3; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                limit = limit > 10 ? 10 : limit;
                return [2 /*return*/, this.orderService.paginate({
                        page: page,
                        limit: limit,
                        route: 'http://localhost:3000/orders/'
                    })];
            });
        });
    };
    OrderController.prototype.getOrderById = function (id) {
        return this.orderService.getOrderById(id);
    };
    OrderController.prototype.updateOrder = function (id, updateOrderDto) {
        return this.orderService.updateOrder(id, updateOrderDto);
    };
    OrderController.prototype.deleteOrderById = function (id) {
        return this.orderService.deleteOrderById(id);
    };
    __decorate([
        common_1.Post(),
        swagger_1.ApiCreatedResponse({
            description: 'The order has been successfully created.',
            type: create_order_dto_1.CreateOrderDto
        }),
        __param(0, common_1.Body(common_1.ValidationPipe))
    ], OrderController.prototype, "createOrder");
    __decorate([
        common_1.Get(),
        swagger_1.ApiCreatedResponse({ type: order_entity_1.Order, status: 200 }),
        swagger_1.ApiQuery({ name: 'limit', required: false }),
        swagger_1.ApiQuery({ name: 'page', required: false }),
        __param(0, common_1.Query('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
        __param(1, common_1.Query('limit', new common_1.DefaultValuePipe(3), common_1.ParseIntPipe))
    ], OrderController.prototype, "index");
    __decorate([
        common_1.Get('/:id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], OrderController.prototype, "getOrderById");
    __decorate([
        common_1.Patch('/:id'),
        swagger_1.ApiBody({ type: update_order_dto_1.UpdateOrderDto }),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body(common_1.ValidationPipe))
    ], OrderController.prototype, "updateOrder");
    __decorate([
        common_1.Delete('/:id'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], OrderController.prototype, "deleteOrderById");
    OrderController = __decorate([
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(local_guard_guard_1.LocalAuthGuard),
        swagger_1.ApiTags('Orders'),
        common_1.Controller('orders')
    ], OrderController);
    return OrderController;
}());
exports.OrderController = OrderController;
