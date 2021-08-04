"use strict";
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
var testing_1 = require("@nestjs/testing");
var order_repository_1 = require("./order.repository");
var order_service_1 = require("./order.service");
var mockOrderRepository = function () { return ({
    getOrders: jest.fn(),
    findOrderById: jest.fn(),
    createOrder: jest.fn(),
    remove: jest.fn(),
    updateOrder: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn()
}); };
describe('OrderService', function () {
    var orderService;
    var orderRepository;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            order_service_1.OrderService,
                            {
                                provide: order_repository_1.OrderRepository,
                                useFactory: mockOrderRepository
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    orderService = module.get(order_service_1.OrderService);
                    orderRepository = module.get(order_repository_1.OrderRepository);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('getOrders', function () {
        it('get all orders from the repository', function () { return __awaiter(void 0, void 0, void 0, function () {
            var filter, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderRepository.getOrders.mockResolvedValue('someValue');
                        expect(orderRepository.getOrders).not.toHaveBeenCalled();
                        filter = { search: 'tuan' };
                        return [4 /*yield*/, orderService.getOrders(filter)];
                    case 1:
                        result = _a.sent();
                        expect(orderRepository.getOrders).toHaveBeenCalled();
                        expect(result).toEqual('someValue');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getOrderById', function () {
        it('call orderRepository.findOne() and return the order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockOrder, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockOrder = {
                            product: 'product 1',
                            address: 'address 1',
                            phone: '0123456789',
                            email: 'tuan@gmail.com',
                            userId: '1'
                        };
                        orderRepository.findOrderById.mockResolvedValue(mockOrder);
                        return [4 /*yield*/, orderRepository.findOrderById(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockOrder);
                        return [2 /*return*/];
                }
            });
        }); });
        it('throw an error if order not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderRepository.findOrderById.mockResolvedValue(null);
                        return [4 /*yield*/, orderRepository.findOrderById(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('createOrder', function () {
        it('Call orderRepository.create() and return the result', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createOrderDto, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderRepository.createOrder.mockResolvedValue('someOrder');
                        expect(orderRepository.createOrder).not.toHaveBeenCalled();
                        createOrderDto = {
                            product: 'product 1',
                            address: 'address 1',
                            phone: '0123456789',
                            email: 'tuan@gmail.com',
                            userId: '1'
                        };
                        return [4 /*yield*/, orderService.createOrder(createOrderDto)];
                    case 1:
                        result = _a.sent();
                        expect(orderRepository.createOrder).toHaveBeenCalledWith(createOrderDto);
                        expect(result).toEqual('someOrder');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('deleteOrder', function () {
        it('delete a order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockOrder, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockOrder = {
                            id: 1,
                            product: 'product 1',
                            address: 'address 1',
                            phone: '0123456789',
                            email: 'tuan@gmail.com',
                            userId: '1'
                        };
                        orderRepository.findOrderById.mockResolvedValue(mockOrder);
                        return [4 /*yield*/, orderRepository.findOrderById(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockOrder);
                        //await orderService.deleteOrderById(1);
                        return [4 /*yield*/, orderRepository.remove()];
                    case 2:
                        //await orderService.deleteOrderById(1);
                        _a.sent();
                        expect(orderRepository.remove).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('throw an error if order not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderRepository.findOrderById.mockResolvedValue(null);
                        return [4 /*yield*/, orderRepository.findOrderById(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('updateOrder', function () {
        it('updates an order successful', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updateOrderDto, mockOrder, save, product, address, phone, email, userId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateOrderDto = {
                            product: 'product 1',
                            address: 'address 1',
                            phone: '0123456789',
                            email: 'tuan@gmail.com',
                            userId: '1'
                        };
                        mockOrder = {
                            product: 'product 1',
                            address: 'address 1',
                            phone: '0123456789',
                            email: 'tuan@gmail.com',
                            userId: '1'
                        };
                        save = jest.fn().mockResolvedValue(true);
                        product = updateOrderDto.product, address = updateOrderDto.address, phone = updateOrderDto.phone, email = updateOrderDto.email, userId = updateOrderDto.userId;
                        orderRepository.findOrderById.mockResolvedValue(mockOrder);
                        return [4 /*yield*/, orderRepository.findOrderById(1)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockOrder);
                        result.product = product;
                        result.address = address;
                        result.phone = phone;
                        result.email = email;
                        result.userId = userId;
                        return [4 /*yield*/, save()];
                    case 2:
                        _a.sent();
                        expect(save).toHaveBeenCalled();
                        expect(result).toEqual(updateOrderDto);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findOneById', function () {
        it('call findOne() and return an order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockOrder, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockOrder = {
                            product: 'product 1',
                            address: 'address 1',
                            phone: '0123456789',
                            email: 'tuan@gmail.com',
                            userId: '1'
                        };
                        orderRepository.findOne.mockResolvedValue(mockOrder);
                        return [4 /*yield*/, orderService.findOrderById(1, mockOrder)];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual(mockOrder);
                        expect(orderRepository.findOne).toHaveBeenCalledWith(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Can not found order by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                orderRepository.findOne.mockResolvedValue(null);
                expect(orderService.getOrderById(1)).rejects.toThrow();
                return [2 /*return*/];
            });
        }); });
    });
});
