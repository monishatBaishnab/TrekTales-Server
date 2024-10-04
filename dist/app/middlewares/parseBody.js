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
exports.parseBody = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.parseBody = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data)) {
        throw new AppError_1.default(400, 'Please provide data in the body under data key');
    }
    const data = JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.data);
    req.body = data;
    next();
}));
