import mongoose, { Schema, Types } from 'mongoose';
import { TPayment } from './payment.types';

const PaymentSchema: Schema = new Schema<TPayment>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['complete', 'pending', 'canceled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Aamarpay'],
      default: 'Aamarpay',
    },
    trans_id: { type: String, required: false },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  },
);

const Payment = mongoose.model<TPayment>('Payment', PaymentSchema);
export default Payment;
