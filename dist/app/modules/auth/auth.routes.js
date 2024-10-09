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
const parseBody_1 = require("../../middlewares/parseBody");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
router.post('/register', multer_config_1.multerUpload.single('image'), parseBody_1.parseBody, (0, validateRequest_1.default)(user_schema_1.userSchema.registerUserSchema), auth_controller_1.authController.register);
router.post('/login', 
// validateRequest(userSchema.loginUserSchema),
auth_controller_1.authController.login);
router.get('/refetch-token', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.USER), auth_controller_1.authController.refetchToken);
exports.authRouter = router;
