import { Router } from 'express';
import { treeController } from '../app/Controllers/treeController.js'

const treeRouter = Router();

treeRouter.get('/api/trees', treeController.index);
treeRouter.get('/api/trees/:id', treeController.show);

export { treeRouter };
