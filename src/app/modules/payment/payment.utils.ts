import axios from 'axios';
import config from '../../config';

type TPaymentInfo = {
  amount: number;
  trans_id: string;
  customer: {
    name: string;
    email: string;
  };
};

export const initiatePayment = async (paymentInfo: TPaymentInfo) => {
  const result = await axios.post(config.amarpay_base_url as string, {
    store_id: config.store_id,
    signature_key: config.signature_key,
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
  return result?.data;
};

export const generateTransactionId = (): string => {
  const prefix = 'TXN';
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit random number
  return `${prefix}${randomNumber}`;
};
