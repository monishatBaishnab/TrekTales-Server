"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.get('/states', payment_controller_1.paymentController === null || payment_controller_1.paymentController === void 0 ? void 0 : payment_controller_1.paymentController.getPayments);
router.post('/create-payment', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), payment_controller_1.paymentController.createPayment);
router.post('/success-payment', payment_controller_1.paymentController.successPayment);
router.post('/failed-payment', payment_controller_1.paymentController.failedPayment);
exports.paymentRoutes = router;
