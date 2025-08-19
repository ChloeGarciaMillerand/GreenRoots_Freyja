import { Router } from 'express';
import { ordersController } from "../app/Controllers/ordersController.js";


const ordersRouter = Router();

ordersRouter.get('/api/orders', ordersController.index)
ordersRouter.post('/api/orders', ordersController.create);

ordersRouter.get('/api/orders/:id', ordersController.show);

export { ordersRouter };
