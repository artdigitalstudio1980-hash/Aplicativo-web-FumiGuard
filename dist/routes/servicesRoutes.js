"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var servicesController_1 = require("../controllers/servicesController");
var auth_1 = require("../middlewares/auth");
var router = (0, express_1.Router)();
router.get('/', servicesController_1.getServices);
// Solo los administradores pueden crear servicios
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, servicesController_1.createService);
exports.default = router;
