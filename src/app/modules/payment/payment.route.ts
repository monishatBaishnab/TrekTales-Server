import { Router } from 'express';
import { paymentController } from './payment.controller';

const router = Router();

router.post('/create-payment', paymentController.createPayment);
router.post('/success-payment', paymentController.successPayment);
router.post('/failed-payment', paymentController.failedPayment);

export const paymentRoutes = router;
