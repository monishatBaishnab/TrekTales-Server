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
exports.paymentService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const payment_model_1 = __importDefault(require("./payment.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const payment_utils_1 = require("./payment.utils");
const posts_model_1 = __importDefault(require("../post/posts.model"));
const comment_model_1 = __importDefault(require("../comment/comment.model"));
const createPaymentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById({ _id: payload === null || payload === void 0 ? void 0 : payload.user });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    const trans_id = (0, payment_utils_1.generateTransactionId)();
    const paymentData = {
        trans_id,
        user: payload === null || payload === void 0 ? void 0 : payload.user,
        amount: 1050,
    };
    yield payment_model_1.default.create(paymentData);
    const paymentInfo = {
        amount: 10,
        trans_id,
        customer: {
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    };
    const payment = yield (0, payment_utils_1.initiatePayment)(paymentInfo);
    return payment;
});
const successPaymentIntoAmarpay = (trans_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filePath = path_1.default.join(__dirname, '../../views/success.html');
    try {
        const data = yield fs_1.promises.readFile(filePath, 'utf8');
        const checkPayment = yield axios_1.default.get(`https://sandbox.aamarpay.com/api/v1/trxcheck/request.php?request_id=${trans_id}&store_id=${config_1.default.store_id}&signature_key=${config_1.default.signature_key}&type=json`);
        if (((_a = checkPayment === null || checkPayment === void 0 ? void 0 : checkPayment.data) === null || _a === void 0 ? void 0 : _a.pay_status) === 'Successful') {
            const updatedPayment = yield payment_model_1.default.findOneAndUpdate({ trans_id }, { status: 'complete' }, { new: true });
            yield user_model_1.default.findOneAndUpdate({ _id: updatedPayment === null || updatedPayment === void 0 ? void 0 : updatedPayment.user }, { isVerified: true });
        }
        return data;
    }
    catch (error) {
        throw new AppError_1.default(Number(http_status_1.default[500]), 'Error reading file');
    }
});
const failedPaymentIntoAmarpay = (trans_id) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, '../../views/failed.html');
    try {
        const data = yield fs_1.promises.readFile(filePath, 'utf8');
        yield payment_model_1.default.updateOne({ trans_id }, { status: 'pending' });
        return data;
    }
    catch (error) {
        throw new AppError_1.default(Number(http_status_1.default[500]), 'Error reading file');
    }
});
const getPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
    const data = yield payment_model_1.default.aggregate([
        // {
        //   $match: {
        //     createdAt: {
        //       $gte: startOfMonth,
        //       $lt: endOfMonth,
        //     },
        //   },
        // },
        {
            $project: {
                formattedDate: {
                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                },
                amount: 1,
            },
        },
        {
            $group: {
                _id: '$formattedDate',
                totalPayments: { $sum: '$amount' },
            },
        },
        {
            $sort: { _id: 1 },
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                value: '$totalPayments',
            },
        },
    ]);
    // Fetch the total payment amount using aggregation
    const totalPayments = yield payment_model_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
            },
        },
    ]);
    // Fetch total user count using countDocuments
    const totalUsers = yield user_model_1.default.countDocuments({});
    // Fetch total post count using countDocuments
    const totalPosts = yield posts_model_1.default.countDocuments({});
    // Fetch total comment count using countDocuments
    const totalComments = yield comment_model_1.default.countDocuments({});
    // Format the result
    const formattedSummary = {
        totalPayments: totalPayments.length > 0 ? totalPayments[0].totalAmount : 0,
        totalUsers,
        totalPosts,
        totalComments,
        states: data,
    };
    return formattedSummary;
});
exports.paymentService = {
    createPaymentIntoDB,
    successPaymentIntoAmarpay,
    failedPaymentIntoAmarpay,
    getPayments,
};
