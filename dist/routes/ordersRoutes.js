"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ordersController_1 = require("../controllers/ordersController");
var auth_1 = require("../middlewares/auth");
var router = (0, express_1.Router)();
router.use(auth_1.authenticateToken); // All order routes require auth
router.post('/', ordersController_1.createOrder);
router.get('/', ordersController_1.getOrders);
router.post('/payment-intent', ordersController_1.createPaymentIntent);
exports.default = router;
