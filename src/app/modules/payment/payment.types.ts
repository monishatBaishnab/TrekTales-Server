import { Schema } from 'mongoose';

export type TPayment = {
  user: Schema.Types.ObjectId;
  amount: number;
  trans_id: string;
  status: 'complete' | 'pending' | 'canceled';
  paymentMethod: 'Aamarpay';
};
