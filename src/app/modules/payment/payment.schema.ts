import { z } from 'zod';

const createPaymentSchema = z.object({
  user: z.string().uuid(), // Ensure this is a valid ObjectId
  amount: z.number().positive(), // Ensure amount is a positive number
  status: z.enum(['complete', 'pending', 'canceled']),
  paymentMethod: z.enum(['Stripe', 'Aamarpay']),
});

export const paymentSchema = { createPaymentSchema };
