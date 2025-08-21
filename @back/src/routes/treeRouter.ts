import { Router } from 'express';
import { treeController } from '../app/Controllers/treeController.js'

const treeRouter = Router();

treeRouter.get('/api/trees', treeController.index);
treeRouter.post('/api/admin/trees', treeController.create);

treeRouter.get('/api/trees/:id', treeController.show);
treeRouter.put('/api/admin/trees/:id', treeController.update);
treeRouter.delete('/api/admin/trees/:id', treeController.delete);

export { treeRouter };
