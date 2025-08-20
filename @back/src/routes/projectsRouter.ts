import { Router } from 'express';
import { projectsController } from "../app/Controllers/projectsController.js";

const projectsRouter = Router();

projectsRouter.get('/api/projects', projectsController.index);
projectsRouter.get('/api/projects/:id', projectsController.show);



export { projectsRouter };
