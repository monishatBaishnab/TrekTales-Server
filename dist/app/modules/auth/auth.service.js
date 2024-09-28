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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = require("http-status");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_model_1.default.create(payload);
    if (!newUser) {
        throw new AppError_1.default(http_status_1.BAD_REQUEST, 'User creation failed.');
    }
    const token = jsonwebtoken_1.default.sign({ email: newUser === null || newUser === void 0 ? void 0 : newUser.email, role: newUser === null || newUser === void 0 ? void 0 : newUser.role, _id: newUser === null || newUser === void 0 ? void 0 : newUser._id }, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    return { token };
});
const loginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () { });
const changePasswordIntoDB = (id, password) => __awaiter(void 0, void 0, void 0, function* () { });
exports.authService = {
    registerIntoDB,
    loginIntoDB,
    changePasswordIntoDB,
};
