import { Router } from 'express';
import { userController } from "../app/Controllers/userController.js";

const userRouter = Router();

userRouter.post('/api/user/login', userController.login);
userRouter.post('/api/user/logout', userController.logout);
userRouter.post('/api/user/register', userController.register);

userRouter.get('/api/user/profile', userController.getProfile);
userRouter.put('/api/user/profile', userController.updateProfile);
userRouter.put('/api/user/change-password', userController.changePassword);
userRouter.delete('/api/user/account', userController.deleteAccount);

userRouter.post('/api/user/forgot-password', userController.forgotPassword);
userRouter.post('/api/user/reset-password', userController.resetPassword);
userRouter.post('/api/user/verify-email', userController.verifyEmail);
userRouter.post('/api/user/refresh-token', userController.refreshToken);

userRouter.get('/api/user/admin/users', userController.getAllUsers);
userRouter.get('/api/user/admin/users/:id', userController.getUserById);
userRouter.put('/api/user/admin/users/:id/role', userController.updateUserRole);

export { userRouter };