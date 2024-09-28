import mongoose, { Schema, Types } from 'mongoose';
import { TPayment } from './payment.types';

const PaymentSchema: Schema = new Schema<TPayment>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['complete', 'pending', 'canceled'],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Aamarpay'],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  },
);

const Payment = mongoose.model<TPayment>('Payment', PaymentSchema);
export default Payment;
