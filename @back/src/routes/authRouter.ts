import { Router } from 'express';
import { authController } from "../app/Controllers/authController.js";

const authRouter = Router();

authRouter.post('/api/login', authController.login);
authRouter.post('/api/login', authController.logout);
authRouter.post('/api/login', authController.register);

export { authRouter };
