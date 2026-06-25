"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
// Import Routes
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
var servicesRoutes_1 = __importDefault(require("./routes/servicesRoutes"));
var ordersRoutes_1 = __importDefault(require("./routes/ordersRoutes"));
// Import routes here later
dotenv_1.default.config();
var dev = process.env.NODE_ENV !== 'production';
var hostname = dev ? 'localhost' : '0.0.0.0';
var port = parseInt(process.env.PORT || '3000', 10);
process.on('unhandledRejection', function (reason, promise) {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
// Initialize Next.js
var app = (0, next_1.default)({ dev: dev, hostname: hostname, port: port });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = (0, express_1.default)();
    // Middlewares
    server.use((0, cors_1.default)({
        origin: process.env.NODE_ENV === 'production'
            ? [process.env.NEXT_PUBLIC_APP_URL || 'https://tu-dominio.com']
            : ['http://localhost:3000', 'http://127.0.0.1:3000'],
        credentials: true,
    }));
    server.use((0, helmet_1.default)({ contentSecurityPolicy: false })); // Disable CSP in dev or configure properly
    server.use((0, morgan_1.default)('dev'));
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use((0, cookie_parser_1.default)());
    // API Routes (Express)
    server.get('/api/health', function (req, res) {
        res.json({ status: 'ok', message: 'Express server is running alongside Next.js' });
    });
    server.use('/api/auth', authRoutes_1.default);
    server.use('/api/users', usersRoutes_1.default);
    server.use('/api/services', servicesRoutes_1.default);
    server.use('/api/orders', ordersRoutes_1.default);
    // Next.js fallback handler for pages
    server.all('*', function (req, res) {
        return handle(req, res);
    });
    server.listen(port, hostname, function () {
        console.log("> Ready on http://".concat(hostname, ":").concat(port));
        console.log("> Environment: ".concat(process.env.NODE_ENV));
    });
}).catch(function (err) {
    console.error('FATAL: Error during server initialization:');
    console.error(err);
    process.exit(1);
});
