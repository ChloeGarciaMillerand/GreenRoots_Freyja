import { Router } from 'express';
import { authController } from "../app/Controllers/authController.js";

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/register', authController.register);

export { authRouter };
