import { Router } from 'express';
import { adminController} from "../app/Controllers/adminController.js";

const adminRouter = Router();

adminRouter.get('/api/admin/trees', adminController.index);
adminRouter.post('/api/admin/trees', adminController.create);

adminRouter.get('/api/admin/trees/:id', adminController.show);
adminRouter.put('/api/admin/trees/:id', adminController.update);
adminRouter.delete('/api/admin/trees/:id', adminController.delete);


export { adminRouter };
