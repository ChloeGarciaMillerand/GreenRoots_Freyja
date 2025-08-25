import { Router } from 'express';
import { paymentController } from '../app/Controllers/paymentController.js';

const paymentRouter: Router = Router();

paymentRouter.post('/api/payments/create-intent', paymentController.createPaymentIntent);
paymentRouter.post('/api/payments/confirm', paymentController.confirmPayment);
paymentRouter.post('/api/payments/test', paymentController.testPayment);
paymentRouter.post('/api/payments/webhook', paymentController.webhook);
paymentRouter.get('/api/payments/status/:order_id', paymentController.getPaymentStatus);

export { paymentRouter };
