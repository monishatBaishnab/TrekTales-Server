"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http_status_1 = __importStar(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check user already exists or not
    const existsUser = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (existsUser) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'User already exists.');
    }
    //create new user
    const newUser = yield user_model_1.default.create(payload);
    if (!newUser) {
        throw new AppError_1.default(http_status_1.BAD_REQUEST, 'User creation failed.');
    }
    //create user token
    const token = jsonwebtoken_1.default.sign({
        email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
        role: newUser === null || newUser === void 0 ? void 0 : newUser.role,
        _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
        isVerified: newUser === null || newUser === void 0 ? void 0 : newUser.isVerified,
    }, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    //return the generated token
    return { token };
});
const loginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check user already exists or not
    const existsUser = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!existsUser) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'User not found.');
    }
    //validate password
    const validatePassword = yield bcrypt_1.default.compare(payload.password, existsUser === null || existsUser === void 0 ? void 0 : existsUser.password);
    if (!validatePassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Password not matched');
    }
    const user = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    //create user token
    const token = jsonwebtoken_1.default.sign({
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        _id: user === null || user === void 0 ? void 0 : user._id,
        isVerified: user === null || user === void 0 ? void 0 : user.isVerified,
    }, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    return { token };
});
const refetchTokenFromDB = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById({ _id: userInfo === null || userInfo === void 0 ? void 0 : userInfo._id });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    //create user token
    const token = jsonwebtoken_1.default.sign({
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        _id: user === null || user === void 0 ? void 0 : user._id,
        isVerified: user === null || user === void 0 ? void 0 : user.isVerified,
    }, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    return token;
});
exports.authService = {
    registerIntoDB,
    loginIntoDB,
    refetchTokenFromDB,
};
