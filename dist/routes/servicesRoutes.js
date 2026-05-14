"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var servicesController_1 = require("../controllers/servicesController");
var auth_1 = require("../middlewares/auth");
var router = (0, express_1.Router)();
router.get('/', servicesController_1.getServices);
// Assume only admin can create, we add auth middleware for now
router.post('/', auth_1.authenticateToken, servicesController_1.createService);
exports.default = router;
