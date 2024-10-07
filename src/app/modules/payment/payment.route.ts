import { Router } from 'express';
import { paymentController } from './payment.controller';
import { USER_ROLE } from '../user/user.constants';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-payment',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  paymentController.createPayment,
);
router.post('/success-payment', paymentController.successPayment);
router.post('/failed-payment', paymentController.failedPayment);

export const paymentRoutes = router;
