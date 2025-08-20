import { Router } from 'express';
import { projectsController } from "../app/Controllers/projectsController.js";

const projectRouter = Router();

projectRouter.get('/api/projects', projectsController.index);
projectRouter.get('/api/projects/:id', projectsController.show);



export { projectRouter };
