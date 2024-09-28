import { Schema } from 'mongoose';

export type TPayment = {
  user: Schema.Types.ObjectId; // Reference to User
  amount: number;
  status: 'complete' | 'pending' | 'canceled';
  paymentMethod: 'Aamarpay';
};
