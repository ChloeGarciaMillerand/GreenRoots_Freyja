import { Router } from 'express';
import { treeController } from '../app/Controllers/treeController.js'

const treeRouter:Router = Router();

treeRouter.get('/api/trees', treeController.index);
treeRouter.get('/api/trees/homepage', treeController.homepage);
treeRouter.get('/api/trees/:id', treeController.show);
treeRouter.get('/api/trees/continent/:continent', treeController.findByContinent);

export { treeRouter };