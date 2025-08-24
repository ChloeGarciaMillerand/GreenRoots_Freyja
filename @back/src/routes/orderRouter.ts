import { Router } from 'express';
import { ordersController } from "../app/Controllers/ordersController.js";
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../app/Middleware/validation.js';

const orderRouter = Router();

const statusValidation = [
  body('status')
    .isIn(['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'])
    .withMessage('Invalid order status')
    .customSanitizer((value) => value.toUpperCase()),
    handleValidationErrors
];

const idValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid order ID is required'),
    handleValidationErrors
];

orderRouter.post('/api/orders', ordersController.create);
orderRouter.put('/api/orders/:id/status', statusValidation, idValidation, ordersController.updateStatus);

orderRouter.get('/api/orders/:id', ordersController.show);

export { orderRouter };
