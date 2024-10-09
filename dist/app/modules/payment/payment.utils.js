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
exports.generateTransactionId = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const initiatePayment = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield axios_1.default.post(config_1.default.amarpay_base_url, {
        store_id: config_1.default.store_id,
        signature_key: config_1.default.signature_key,
        success_url: `http://localhost:5000/api/v1/payments/success-payment?trans_id=${paymentInfo.trans_id}`,
        fail_url: `http://localhost:5000/api/v1/payments/failed-payment?trans_id=${paymentInfo.trans_id}`,
        cancel_url: `http://localhost:5000`,
        tran_id: paymentInfo.trans_id,
        amount: paymentInfo.amount,
        currency: 'BDT',
        cus_name: paymentInfo.customer.name,
        cus_email: paymentInfo.customer.email,
        cus_phone: '019838',
        cus_add1: null,
        cus_country: null,
        cus_city: null,
        cus_state: null,
        cus_postcode: null,
        desc: 'Simple Description.',
        cus_add2: null,
        type: 'json',
    });
    return result === null || result === void 0 ? void 0 : result.data;
});
exports.initiatePayment = initiatePayment;
const generateTransactionId = () => {
    const prefix = 'TXN';
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit random number
    return `${prefix}${randomNumber}`;
};
exports.generateTransactionId = generateTransactionId;
