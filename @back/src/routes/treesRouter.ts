import { Router } from 'express';
import { treesController } from '../app/Controllers/treesController.js'

const treesRouter = Router();

treesRouter.get('/api/trees', treesController.index);
treesRouter.get('/api/trees/:id', treesController.show);

export { treesRouter };
