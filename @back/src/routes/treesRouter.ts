import { Router } from 'express';
import { treesController } from '../app/Controllers/treesController.js'

const treesRouter = Router();

treesRouter.get('/trees', treesController.index);
treesRouter.get('/trees/:id', treesController.show);

export { treesRouter };
