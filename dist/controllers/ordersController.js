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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = exports.getOrders = exports.createOrder = void 0;
var prisma_1 = require("../lib/prisma");
var stripe_1 = __importDefault(require("stripe"));
var zod_1 = require("zod");
var stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-04-10',
});
var createOrderSchema = zod_1.z.object({
    serviceId: zod_1.z.string().uuid('ID de servicio inválido'),
    plagueType: zod_1.z.string().min(2, 'El tipo de plaga es requerido'),
    areaSize: zod_1.z.number().positive('El tamaño del área debe ser un número positivo'),
    propertyType: zod_1.z.string().min(2, 'El tipo de propiedad es requerido'),
});
var createPaymentIntentSchema = zod_1.z.object({
    orderId: zod_1.z.string().uuid('ID de orden inválido'),
});
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, validatedData, serviceId, plagueType, areaSize, propertyType, service, calculatedPrice, totalPrice, order, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId)
                    return [2 /*return*/, res.status(401).json({ error: 'Unauthorized' })];
                validatedData = createOrderSchema.parse(req.body);
                serviceId = validatedData.serviceId, plagueType = validatedData.plagueType, areaSize = validatedData.areaSize, propertyType = validatedData.propertyType;
                return [4 /*yield*/, prisma_1.prisma.service.findUnique({ where: { id: serviceId } })];
            case 1:
                service = _b.sent();
                if (!service)
                    return [2 /*return*/, res.status(404).json({ error: 'Servicio no encontrado' })];
                calculatedPrice = service.basePrice;
                if (areaSize > 100) {
                    calculatedPrice += (areaSize - 100) * 1000; // Recargo por metro cuadrado extra
                }
                totalPrice = Math.max(calculatedPrice, 180000);
                return [4 /*yield*/, prisma_1.prisma.order.create({
                        data: {
                            userId: userId,
                            serviceId: serviceId,
                            plagueType: plagueType,
                            areaSize: areaSize,
                            propertyType: propertyType,
                            totalPrice: totalPrice,
                        }
                    })];
            case 2:
                order = _b.sent();
                res.status(201).json(order);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                if (error_1 instanceof zod_1.z.ZodError) {
                    return [2 /*return*/, res.status(400).json({ error: error_1.issues })];
                }
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, orders, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId)
                    return [2 /*return*/, res.status(401).json({ error: 'Unauthorized' })];
                return [4 /*yield*/, prisma_1.prisma.order.findMany({
                        where: { userId: userId },
                        include: { service: true }
                    })];
            case 1:
                orders = _b.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
var createPaymentIntent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, orderId, order, paymentIntent, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId)
                    return [2 /*return*/, res.status(401).json({ error: 'Unauthorized' })];
                orderId = createPaymentIntentSchema.parse(req.body).orderId;
                return [4 /*yield*/, prisma_1.prisma.order.findUnique({ where: { id: orderId } })];
            case 1:
                order = _c.sent();
                if (!order)
                    return [2 /*return*/, res.status(404).json({ error: 'Orden no encontrada' })];
                // Evitar IDOR: Validar propiedad de la orden.
                // Solo el dueño de la orden o un admin pueden procesar el pago.
                if (order.userId !== userId && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== 'ADMIN') {
                    return [2 /*return*/, res.status(403).json({ error: 'No tienes permiso para acceder a esta orden' })];
                }
                return [4 /*yield*/, stripe.paymentIntents.create({
                        amount: Math.round(order.totalPrice * 100), // Stripe espera centavos, redondeado
                        currency: 'cop',
                        metadata: { orderId: order.id }
                    })];
            case 2:
                paymentIntent = _c.sent();
                return [4 /*yield*/, prisma_1.prisma.order.update({
                        where: { id: order.id },
                        data: { paymentId: paymentIntent.id }
                    })];
            case 3:
                _c.sent();
                res.json({ clientSecret: paymentIntent.client_secret });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _c.sent();
                if (error_3 instanceof zod_1.z.ZodError) {
                    return [2 /*return*/, res.status(400).json({ error: error_3.issues })];
                }
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createPaymentIntent = createPaymentIntent;
