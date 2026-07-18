"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var rateLimiter_1 = require("../middlewares/rateLimiter");
var router = (0, express_1.Router)();
// Aplicar rate limiter de autenticación para mitigar fuerza bruta en todas las peticiones
router.use(rateLimiter_1.authLimiter);
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.post('/logout', authController_1.logout);
router.post('/forgot-password', authController_1.forgotPassword);
router.post('/reset-password', authController_1.resetPassword);
exports.default = router;
