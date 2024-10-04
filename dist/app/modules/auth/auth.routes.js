"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_schema_1 = require("../user/user.schema");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const router = (0, express_1.Router)();
router.post('/register', (0, validateRequest_1.default)(user_schema_1.userSchema.registerUserSchema), auth_controller_1.authController.register);
router.post('/login', (0, auth_1.default)(user_constants_1.USER_ROLE.USER), (0, validateRequest_1.default)(user_schema_1.userSchema.loginUserSchema), auth_controller_1.authController.login);
router.post('/change-password', auth_controller_1.authController.changePassword);
exports.authRouter = router;
