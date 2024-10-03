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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check user already exists or not
    // const existsUser = await User.findOne({ email: payload?.email });
    // if (existsUser) {
    //   throw new AppError(httpStatus.CONFLICT, 'User already exists.');
    // }
    // console.log(payload);
    // //create new user
    // const newUser = await User.create(payload);
    // if (!newUser) {
    //   throw new AppError(BAD_REQUEST, 'User creation failed.');
    // }
    // //create user token
    // const token = jwt.sign(
    //   { email: newUser?.email, role: newUser?.role, _id: newUser?._id },
    //   config.jwt_access_secret as string,
    //   {
    //     expiresIn: config.jwt_access_expires_in,
    //   },
    // );
    // //return the generated token
    // return { token };
    return {};
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
    const token = jsonwebtoken_1.default.sign({ email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role, _id: user === null || user === void 0 ? void 0 : user._id }, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    return { token };
});
const changePasswordIntoDB = (id, password) => __awaiter(void 0, void 0, void 0, function* () { });
exports.authService = {
    registerIntoDB,
    loginIntoDB,
    changePasswordIntoDB,
};
