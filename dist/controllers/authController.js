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
exports.resetPassword = exports.forgotPassword = exports.logout = exports.login = exports.register = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var prisma_1 = require("../lib/prisma");
var zod_1 = require("zod");
var crypto_1 = __importDefault(require("crypto"));
var registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
    phone: zod_1.z.string().optional(),
    propertyType: zod_1.z.string().optional(),
    acceptsOffers: zod_1.z.boolean().optional()
});
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name_1, phone, propertyType, acceptsOffers, existingUser, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = registerSchema.parse(req.body), email = _a.email, password = _a.password, name_1 = _a.name, phone = _a.phone, propertyType = _a.propertyType, acceptsOffers = _a.acceptsOffers;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({ where: { email: email } })];
            case 1:
                existingUser = _b.sent();
                if (existingUser)
                    return [2 /*return*/, res.status(400).json({ error: 'El correo electrónico ya está registrado' })];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma_1.prisma.user.create({
                        data: { email: email, password: hashedPassword, name: name_1, phone: phone, propertyType: propertyType, acceptsOffers: acceptsOffers !== null && acceptsOffers !== void 0 ? acceptsOffers : true }
                    })];
            case 3:
                user = _b.sent();
                res.status(201).json({ message: 'User created successfully', userId: user.id });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                if (error_1 instanceof zod_1.z.ZodError) {
                    return [2 /*return*/, res.status(400).json({ error: error_1.issues })];
                }
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, token, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({ where: { email: email } })];
            case 1:
                user = _c.sent();
                _b = !user;
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                _b = !(_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    return [2 /*return*/, res.status(401).json({ error: 'Invalid credentials' })];
                }
                token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '1d' });
                // Set HTTP-only cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });
                res.json({ message: 'Logged in successfully', user: { id: user.id, email: user.email, name: user.name, role: user.role } });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};
exports.logout = logout;
var forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, resetToken, resetPasswordToken, resetPasswordExpires, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                email = req.body.email;
                return [4 /*yield*/, prisma_1.prisma.user.findUnique({ where: { email: email } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    // Por seguridad, no revelamos si el usuario existe o no, pero retornamos éxito aparente
                    return [2 /*return*/, res.status(200).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' })];
                }
                resetToken = crypto_1.default.randomBytes(32).toString('hex');
                resetPasswordToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
                resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
                return [4 /*yield*/, prisma_1.prisma.user.update({
                        where: { email: email },
                        data: { resetPasswordToken: resetPasswordToken, resetPasswordExpires: resetPasswordExpires }
                    })];
            case 2:
                _a.sent();
                // AQUÍ IRÍA LA LÓGICA DE ENVÍO DE CORREO (ej. con Resend o Nodemailer)
                // const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
                // await sendEmail(user.email, 'Recuperación de contraseña Fumiguard', `Tu enlace: ${resetUrl}`);
                console.log("[DEV ONLY] Token de recuperaci\u00F3n para ".concat(email, ": ").concat(resetToken));
                res.status(200).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ error: 'Error procesando la solicitud de recuperación' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, newPassword, resetPasswordToken, user, hashedPassword, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, token = _a.token, newPassword = _a.newPassword;
                resetPasswordToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
                return [4 /*yield*/, prisma_1.prisma.user.findFirst({
                        where: {
                            resetPasswordToken: resetPasswordToken,
                            resetPasswordExpires: { gt: new Date() }
                        }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ error: 'El token de recuperación es inválido o ha expirado' })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(newPassword, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma_1.prisma.user.update({
                        where: { id: user.id },
                        data: {
                            password: hashedPassword,
                            resetPasswordToken: null,
                            resetPasswordExpires: null
                        }
                    })];
            case 3:
                _b.sent();
                res.status(200).json({ message: 'Contraseña actualizada exitosamente. Ya puedes iniciar sesión.' });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                res.status(500).json({ error: 'Error restableciendo la contraseña' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
