"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = void 0;
const zod_1 = require("zod");
const createPaymentSchema = zod_1.z.object({
    user: zod_1.z.string().uuid(), // Ensure this is a valid ObjectId
    amount: zod_1.z.number().positive(), // Ensure amount is a positive number
    status: zod_1.z.enum(['complete', 'pending', 'canceled']),
    paymentMethod: zod_1.z.enum(['Stripe', 'Aamarpay']),
});
exports.paymentSchema = { createPaymentSchema };
